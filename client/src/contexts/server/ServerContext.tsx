import React, { createContext, useEffect, useState } from 'react';
import { IServerContext, IServerContextProps } from './ServerTypes';

const defaultValue: IServerContext = {};

export const serverContext = createContext<IServerContext>(defaultValue);

const { Provider } = serverContext;

export function ServerContext({ serverId, children }: IServerContextProps) {
  const [id, setId] = useState(serverId);

  useEffect(() => {
    setId(serverId);
  }, [serverId]);

  return <Provider value={{}}>{children}</Provider>;
}
