import React from 'react';
import { IUser } from '../store/DataStoreTypes';

export interface IIncomingCallContext {
  caller: IUser;
  answer(): void;
  reject(): void;
}

export interface IIncomingCallContextProps {
  children?: React.ReactNode;
}

export interface IIncomingCall {
  id: number;
  caller: IUser;
}
