import React, { createContext, useCallback, useContext, useState } from 'react';
import { callContext } from '../call/CallContext';
import { IUserContext, IUserContextProps, Status } from './UserTypes';

const defaultValue: IUserContext = {
  status: Status.OFFLINE,
  startCall: () => void 0,
};

export const userContext = createContext<IUserContext>(defaultValue);

const { Provider } = userContext;

export function UserContextProvider({ userId, children }: IUserContextProps) {
  const [id] = useState(userId);
  const [status, setStatus] = useState(Status.OFFLINE);
  const { startCall } = useContext(callContext);

  const start = useCallback(() => {
    startCall(id);
  }, [id, startCall]);

  return <Provider value={{ status, startCall: start }}>{children}</Provider>;
}
