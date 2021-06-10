import React, { createContext, useCallback, useContext, useState } from 'react';
import { callContext } from '../call/CallContext';
import { IUserContext, IUserContextProps } from './UserTypes';

const defaultValue: IUserContext = {
  startCall: () => void 0,
};

export const userContext = createContext<IUserContext>(defaultValue);

const { Provider } = userContext;

export function UserContextProvider({ userId, children }: IUserContextProps) {
  const [id] = useState(userId);
  const { startCall } = useContext(callContext);

  const start = useCallback(() => {
    startCall(id);
  }, [id, startCall]);

  return <Provider value={{ startCall: start }}>{children}</Provider>;
}
