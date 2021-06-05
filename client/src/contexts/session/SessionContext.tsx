import React from 'react';
import { createContext, useState } from 'react';
import { HttpClient } from '../../api/client';
import { ISessionContext, ISessionContextProps } from './SessionTypes';

const defaultValue: ISessionContext = {
  loggedIn: false,
  setToken: (token: string) => void 0,
  httpClient: new HttpClient(),
};

export const sessionContext = createContext<ISessionContext>(defaultValue);

const { Provider } = sessionContext;

export function SessionContextProvider({ children }: ISessionContextProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [httpClient] = useState(new HttpClient());

  const setToken = (token: string) => {
    setLoggedIn(token.length !== 0);
    httpClient.token = token;
  };

  return (
    <Provider value={{ loggedIn, httpClient, setToken }}>{children}</Provider>
  );
}
