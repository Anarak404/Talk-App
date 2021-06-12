import React from 'react';
import { IMessage, IMessageStore } from '../../components/messages';

export interface IDataStoreContext {
  findUser(id: number): IUser | undefined;
  saveUser(user: IUser): void;
  saveUsers(users: IUser[]): void;
  friends: IUser[];
  saveFriends(friendsId: number[]): void;
  saveFriend(friendId: number): void;
  saveMessage(sender: number, message: IMessage): void;
  getMessages(sender: number): IMessage[];
}

export interface IDataStoreContextProps {
  children?: React.ReactNode;
}

export interface IUser {
  id: number;
  name: string;
  photo: string | null;
}
