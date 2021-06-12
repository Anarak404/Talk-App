import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { callContext } from '../call/CallContext';
import { sessionContext } from '../session/SessionContext';
import { dataStoreContext } from '../store/DataStoreContext';
import { IUser } from '../store/DataStoreTypes';
import { IUserContext, IUserContextProps } from './UserTypes';

const defaultValue: IUserContext = {
  startCall: () => void 0,
  sendMessage: (message: string) => void 0,
  user: undefined,
};

export const userContext = createContext<IUserContext>(defaultValue);

const { Provider } = userContext;

export function UserContextProvider({ userId, children }: IUserContextProps) {
  const [id, setId] = useState(userId);
  const [user, setUser] = useState<IUser>();

  const { startCall } = useContext(callContext);
  const { websocket } = useContext(sessionContext);
  const { findUser } = useContext(dataStoreContext);

  useEffect(() => {
    setId(userId);
  }, [userId]);

  useEffect(() => {
    const user = findUser(id);
    if (user) {
      setUser(user);
    }
    // TODO: fetch user from server if not found
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

  return (
    <Provider value={{ startCall: start, sendMessage, user }}>
      {children}
    </Provider>
  );
}
