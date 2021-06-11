import React from 'react';
import { IUser } from '../store/DataStoreTypes';

export interface IUserContext {
  startCall(): void;
  sendMessage(message: string): void;
  user?: IUser;
}

export interface IUserContextProps {
  userId: number;
  children?: React.ReactNode;
}
