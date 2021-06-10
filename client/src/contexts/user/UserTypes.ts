import React from 'react';

export interface IUserContext {
  startCall(): void;
}

export interface IUserContextProps {
  userId: number;
  children?: React.ReactNode;
}
