import React from 'react';
import { HttpClient } from '../../api/client';

export interface ISessionContext {
  loggedIn: boolean;
  setToken(token: string): void;
  httpClient: HttpClient;
}

export interface ISessionContextProps {
  children?: React.ReactNode;
}
