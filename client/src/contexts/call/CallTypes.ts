import React from 'react';

export interface ICallContext {
  muted: boolean;
  inCall: boolean;
  calling: boolean;
  attenderId: number;
  toggleMute(): void;
  endCall(): void;
  startCall(userId: number): void;
  rejectCall(): void;
  answerCall(): void;
}

export interface ICallContextProps {
  children?: React.ReactNode;
}
