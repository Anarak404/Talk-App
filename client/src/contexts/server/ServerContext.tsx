import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { IServer } from '../../api';
import { dataStoreContext } from '../store/DataStoreContext';
import { IServerContext, IServerContextProps } from './ServerTypes';

const defaultValue: IServerContext = {
  name: '',
};

export const serverContext = createContext<IServerContext>(defaultValue);

const { Provider } = serverContext;

export function ServerContext({ serverId, children }: IServerContextProps) {
  const { servers } = useContext(dataStoreContext);
  const [server, setServer] = useState<IServer>();

  useEffect(
    () => setServer(servers.find((s) => s.id === serverId)),
    [serverId]
  );

  return (
    <Provider value={{ name: server ? server.name : '' }}>{children}</Provider>
  );
}
