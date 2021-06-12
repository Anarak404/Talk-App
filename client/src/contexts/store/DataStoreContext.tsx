import { useAsyncStorage } from '@react-native-community/async-storage';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  IDataStoreContext,
  IDataStoreContextProps,
  IUser,
} from './DataStoreTypes';

const defaultValue: IDataStoreContext = {
  findUser: (id: number) => undefined,
  saveUser: (user: IUser) => void 0,
  saveUsers: (users: IUser[]) => void 0,
  friends: [],
};

export const dataStoreContext = createContext<IDataStoreContext>(defaultValue);

const { Provider } = dataStoreContext;

export function DataStoreContextProvider({ children }: IDataStoreContextProps) {
  const [users, setUsers] = useState<IUser[]>([]);

  const [friends, setFriends] = useState<number[]>([]);

  const { setItem, getItem } = useAsyncStorage('users');
  const { getItem: getFriends, setItem: saveFriends } =
    useAsyncStorage('friends');

  useEffect(() => {
    getItem().then((d: string | null) => {
      if (d) {
        setUsers(JSON.parse(d));
      }
    });

    getFriends().then((d: string | null) => {
      if (d) {
        setFriends(JSON.parse(d));
      }
    });
  }, []);

  useEffect(() => {
    setItem(JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    saveFriends(JSON.stringify(friends));
  }, [friends]);

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

  const friendsList = useMemo(
    () => [...friends.map((x) => findUser(x) as IUser)],
    [friends, findUser]
  );

  return (
    <Provider value={{ findUser, saveUser, saveUsers, friends: friendsList }}>
      {children}
    </Provider>
  );
}
