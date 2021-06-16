import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getPrivateMessages } from '../../api';
import { IMessage } from '../../components/messages';
import { callContext } from '../call/CallContext';
import { sessionContext } from '../session/SessionContext';
import { dataStoreContext } from '../store/DataStoreContext';
import { IUser } from '../store/DataStoreTypes';
import { IUserContext, IUserContextProps } from './UserTypes';

const defaultValue: IUserContext = {
  startCall: () => void 0,
  sendMessage: (message: string) => void 0,
  messages: [],
  user: undefined,
};

export const userContext = createContext<IUserContext>(defaultValue);

const { Provider } = userContext;

export function UserContextProvider({ userId, children }: IUserContextProps) {
  const [id, setId] = useState(userId);
  const [user, setUser] = useState<IUser>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { startCall } = useContext(callContext);
  const { websocket, httpClient } = useContext(sessionContext);
  const { findUser, getMessages } = useContext(dataStoreContext);

  useEffect(() => {
    setId(userId);
  }, [userId]);

  useEffect(() => {
    const user = findUser(id);
    if (user) {
      setUser(user);
    }

    setMessages(getMessages(id));
    getPrivateMessages(httpClient, id).then((messages) =>
      setMessages(
        messages.map((e) => {
          return {
            id: e.id,
            name: e.user.name,
            photo: e.user.photo ? e.user.photo : undefined,
            text: e.message,
          };
        })
      )
    );
  }, [id]);

  const start = useCallback(() => {
    startCall(id);
  }, [id, startCall]);

  const sendMessage = useCallback(
    (message: string) => {
      websocket?.send(
        '/app/private/message',
        JSON.stringify({ receiverId: id, message })
      );
    },
    [id, websocket]
  );

  useEffect(() => {
    const newMessages = getMessages(id);
    setMessages((messages) => {
      const saveMessagesIds = messages.map((m) => m.id);
      return [
        ...messages,
        ...newMessages.filter((e) => !saveMessagesIds.includes(e.id)),
      ];
    });
  }, [getMessages]);

  return (
    <Provider value={{ startCall: start, sendMessage, user, messages }}>
      {children}
    </Provider>
  );
}
