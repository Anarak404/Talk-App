import Clipboard from '@react-native-community/clipboard';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { generateCode as generateCodeApi, IServer } from '../../api';
import { sessionContext } from '../session/SessionContext';
import { dataStoreContext } from '../store/DataStoreContext';
import { IServerContext, IServerContextProps } from './ServerTypes';

const defaultValue: IServerContext = {
  name: '',
  generateCode: () => new Promise((resolve, reject) => {}),
};

export const serverContext = createContext<IServerContext>(defaultValue);

const { Provider } = serverContext;

export function ServerContext({ serverId, children }: IServerContextProps) {
  const { servers } = useContext(dataStoreContext);
  const { httpClient } = useContext(sessionContext);
  const [server, setServer] = useState<IServer>();

  useEffect(
    () => setServer(servers.find((s) => s.id === serverId)),
    [serverId]
  );

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

  return (
    <Provider value={{ name: server ? server.name : '', generateCode }}>
      {children}
    </Provider>
  );
}
