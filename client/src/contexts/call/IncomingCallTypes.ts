import React from 'react';

export interface IIncomingCallContext {
  caller: ICaller;
}

export interface IIncomingCallContextProps {
  children?: React.ReactNode;
}

export interface IIncomingCall {
  id: number;
  caller: ICaller;
}

export interface ICaller {
  id: number;
  name: string;
  photo: string | null;
}
