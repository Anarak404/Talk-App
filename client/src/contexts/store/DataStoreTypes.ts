import React from 'react';
import { IAuthenticationResponse, IServer } from '../../api';
import { HttpClient } from '../../api/client';
import { IMessage, IMessageResponse } from '../../components/messages';
import { IServerMessageResponse } from '../../components/messages/MessageTypes';

export interface IDataStoreContext {
  findUser(id: number): IUser | undefined;
  saveUser(user: IUser): void;
  friends: IUser[];
  saveMessage: React.MutableRefObject<(message: IMessageResponse) => void>;
  saveServerMessage: React.MutableRefObject<
    (serverId: number, message: IServerMessageResponse) => void
  >;
  getMessages(user: number): IMessage[];
  saveAuthenticationResponse(data: IAuthenticationResponse): void;
  me: IUser;
  servers: IServer[];
  refetchProfile(httpClient: HttpClient): void;
  wipeData(): void;
}

export interface IDataStoreContextProps {
  children?: React.ReactNode;
}

export interface IUser {
  id: number;
  name: string;
  photo: string | null;
}
