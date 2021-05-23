import React from 'react';
import { HttpClient } from '../api/client';

export interface IUserContext {
  loggedIn: boolean;
  setToken(token: string): void;
  httpClient: HttpClient;
}

export interface IUserContextProps {
  children?: React.ReactNode;
}
