import React from 'react';
import { createContext, useState } from 'react';
import { HttpClient } from '../api/client';
import { IUserContext, IUserContextProps } from './UserTypes';

const defaultValue: IUserContext = {
  loggedIn: false,
  setToken: (token: string) => void 0,
  httpClient: new HttpClient(),
};

export const userContext = createContext<IUserContext>(defaultValue);

const { Provider } = userContext;

export function UserContextProvider({ children }: IUserContextProps) {
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
