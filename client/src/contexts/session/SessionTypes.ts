import React from 'react';
import { HttpClient } from '../../api/client';

export interface ISessionContext {
  loggedIn: boolean;
  logIn(token: string): void;
  httpClient: HttpClient;
  token: string;
}

export interface ISessionContextProps {
  children?: React.ReactNode;
}
