import React from 'react';
import * as Stomp from 'webstomp-client';
import { HttpClient } from '../../api/client';
import { IIncomingCall } from '../call/IncomingCallTypes';

export interface ISessionContext {
  loggedIn: boolean;
  logIn(token: string): void;
  httpClient: HttpClient;
  token: string;
  isIncomingCall: boolean;
  incomingCall: IIncomingCall;
  rejectOrAnswerCall(): void;
  websocket: Stomp.Client | undefined;
}

export interface ISessionContextProps {
  children?: React.ReactNode;
}
