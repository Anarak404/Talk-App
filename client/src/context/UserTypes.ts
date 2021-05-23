import React from 'react';

export interface IUserContext {
  status: Status;
}

export interface IUserContextProps {
  userId: number;
  children?: React.ReactNode;
}

export enum Status {
  ONLINE,
  OFFLINE,
  BUSY,
}
