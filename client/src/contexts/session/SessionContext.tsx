import React, { createContext, useState } from 'react';
import { HttpClient } from '../../api/client';
import { ISessionContext, ISessionContextProps } from './SessionTypes';

const defaultValue: ISessionContext = {
  loggedIn: false,
  logIn: (token: string) => void 0,
  httpClient: new HttpClient(),
  token: '',
};

export const sessionContext = createContext<ISessionContext>(defaultValue);

const { Provider } = sessionContext;

export function SessionContextProvider({ children }: ISessionContextProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [httpClient] = useState(new HttpClient());
  const [token, setToken] = useState('');

  const logIn = (token: string) => {
    setLoggedIn(token.length !== 0);
    setToken(token);
    httpClient.token = token;
  };

  return (
    <Provider value={{ loggedIn, httpClient, logIn, token }}>
      {children}
    </Provider>
  );
}
