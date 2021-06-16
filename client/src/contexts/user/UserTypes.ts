import React from 'react';
import { IMessage } from '../../components/messages';
import { IUser } from '../store/DataStoreTypes';

export interface IUserContext {
  startCall(): void;
  sendMessage(message: string): void;
  messages: IMessage[];
  user?: IUser;
}

export interface IUserContextProps {
  userId: number;
  children?: React.ReactNode;
}
