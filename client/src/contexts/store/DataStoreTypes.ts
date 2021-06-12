import React from 'react';
import { IAuthenticationResponse } from '../../api';
import { IMessage, IMessageResponse } from '../../components/messages';

export interface IDataStoreContext {
  findUser(id: number): IUser | undefined;
  saveUser(user: IUser): void;
  saveUsers(users: IUser[]): void;
  friends: IUser[];
  saveFriends(friendsId: number[]): void;
  saveFriend(friendId: number): void;
  saveMessage: React.MutableRefObject<(message: IMessageResponse) => void>;
  getMessages(user: number): IMessage[];
  saveMe(data: IAuthenticationResponse): void;
}

export interface IDataStoreContextProps {
  children?: React.ReactNode;
}

export interface IUser {
  id: number;
  name: string;
  photo: string | null;
}
