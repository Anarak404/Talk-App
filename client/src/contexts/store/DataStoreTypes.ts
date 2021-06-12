import React from 'react';

export interface IDataStoreContext {
  findUser(id: number): IUser | undefined;
  saveUser(user: IUser): void;
  saveUsers(users: IUser[]): void;
  friends: IUser[];
  saveFriends(friendsId: number[]): void;
  saveFriend(friendId: number): void;
}

export interface IDataStoreContextProps {
  children?: React.ReactNode;
}

export interface IUser {
  id: number;
  name: string;
  photo: string | null;
}
