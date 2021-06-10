import React from 'react';

export interface IUserContext {
  startCall(): void;
  sendMessage(message: string): void;
}

export interface IUserContextProps {
  userId: number;
  children?: React.ReactNode;
}
