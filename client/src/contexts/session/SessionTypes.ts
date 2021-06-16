import React from 'react';
import * as Stomp from 'webstomp-client';
import { IAuthenticationResponse } from '../../api';
import { HttpClient } from '../../api/client';
import { IIncomingCall } from '../call/IncomingCallTypes';

export interface ISessionContext {
  loggedIn: boolean;
  logIn(user: IAuthenticationResponse): void;
  httpClient: HttpClient;
  token: string;
  isIncomingCall: boolean;
  incomingCall: IIncomingCall;
  rejectOrAnswerCall(): void;
  websocket?: Stomp.Client;
  logout(): void;
}

export interface ISessionContextProps {
  children?: React.ReactNode;
}
