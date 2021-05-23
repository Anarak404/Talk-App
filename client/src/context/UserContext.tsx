import React, { createContext, useState } from 'react';
import { IUserContext, IUserContextProps, Status } from './UserTypes';

const defaultValue: IUserContext = {
  status: Status.OFFLINE,
};

const userContext = createContext<IUserContext>(defaultValue);

const { Provider } = userContext;

export function UserContextProvider({ userId, children }: IUserContextProps) {
  const [id] = useState(userId);
  const [status, setStatus] = useState(Status.OFFLINE);

  return <Provider value={{ status }}>{children}</Provider>;
}
