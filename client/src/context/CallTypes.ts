import React from 'react';

export interface ICallContext {
  muted: boolean;
  inCall: boolean;
  calling: boolean;
  toggleMute(): void;
  endCall(): void;
  startCall(): void;
  rejectCall(): void;
  answerCall(): void;
}

export interface ICallContextProps {
  children?: React.ReactNode;
}
