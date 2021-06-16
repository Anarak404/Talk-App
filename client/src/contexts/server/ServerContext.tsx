import Clipboard from '@react-native-community/clipboard';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { generateCode as generateCodeApi, IServer } from '../../api';
import { IMessage } from '../../components/messages';
import { sessionContext } from '../session/SessionContext';
import { dataStoreContext } from '../store/DataStoreContext';
import { IServerContext, IServerContextProps } from './ServerTypes';

const defaultValue: IServerContext = {
  name: '',
  generateCode: () => new Promise((resolve, reject) => {}),
  sendMessage: (message: string) => void 0,
  messages: [],
};

export const serverContext = createContext<IServerContext>(defaultValue);

const { Provider } = serverContext;

export function ServerContext({ serverId, children }: IServerContextProps) {
  const { servers, getServerMessages } = useContext(dataStoreContext);
  const { httpClient, websocket } = useContext(sessionContext);
  const [server, setServer] = useState<IServer>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setServer(servers.find((s) => s.id === serverId));
    setMessages(getServerMessages(serverId));
  }, [serverId]);

  useEffect(() => {
    const newMessages = getServerMessages(serverId);
    setMessages((messages) => {
      const savedMessagesIds = messages.map((m) => m.id);
      return [
        ...messages,
        ...newMessages.filter((e) => !savedMessagesIds.includes(e.id)),
      ];
    });
  }, [getServerMessages]);

  const generateCode = useCallback(async () => {
    if (server) {
      try {
        const response = await generateCodeApi(httpClient, server.id);
        Clipboard.setString(response.code);
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }, [server, httpClient]);

  const sendMessage = useCallback(
    (message: string) => {
      if (server) {
        websocket?.send(
          '/app/server/message',
          JSON.stringify({ receiverId: server.id, message })
        );
      }
    },
    [websocket, server]
  );

  return (
    <Provider
      value={{
        name: server ? server.name : '',
        generateCode,
        sendMessage,
        messages,
      }}
    >
      {children}
    </Provider>
  );
}
