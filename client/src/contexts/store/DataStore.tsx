import { useAsyncStorage } from '@react-native-community/async-storage';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import {
  IDataStoreContext,
  IDataStoreContextProps,
  IUser,
} from './DataStoreTypes';

const defaultValue: IDataStoreContext = {
  findUser: (id: number) => undefined,
  saveUser: (user: IUser) => void 0,
  saveUsers: (users: IUser[]) => void 0,
};

export const dataStoreContext = createContext<IDataStoreContext>(defaultValue);

const { Provider } = dataStoreContext;

export function DataStoreContextProvider({ children }: IDataStoreContextProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  const { setItem, getItem } = useAsyncStorage('users');

  useEffect(() => {
    getItem().then((d: string | null) => {
      if (d) {
        setUsers(JSON.parse(d));
      }
    });
  }, []);

  useEffect(() => {
    setItem(JSON.stringify(users));
  }, [users]);

  const findUser = useCallback(
    (id: number) => users.find((u) => u.id === id),
    [users]
  );

  const saveUser = useCallback(
    (user: IUser) =>
      setUsers((users) => [...users.filter((u) => u.id !== user.id), user]),
    [setUsers]
  );

  const saveUsers = useCallback(
    (data: IUser[]) => {
      const ids = [...data.map((u) => u.id)];
      setUsers((users) => [
        ...users.filter((u) => !ids.includes(u.id)),
        ...data,
      ]);
    },
    [setUsers]
  );

  return (
    <Provider value={{ findUser, saveUser, saveUsers }}>{children}</Provider>
  );
}
