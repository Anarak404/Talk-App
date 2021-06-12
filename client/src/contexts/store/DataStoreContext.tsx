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
  saveFriends: (friends: number[]) => void 0,
  saveFriend: (friend: number) => void 0,
};

export const dataStoreContext = createContext<IDataStoreContext>(defaultValue);

const { Provider } = dataStoreContext;

export function DataStoreContextProvider({ children }: IDataStoreContextProps) {
  const [users, setUsers] = useState<IUser[]>([]);

  const [friends, setFriends] = useState<number[]>([]);

  const { getItem: getUsers, setItem: persistUsers } = useAsyncStorage('users');
  const { getItem: getFriends, setItem: persistFriends } =
    useAsyncStorage('friends');

  useEffect(() => {
    getUsers().then((d: string | null) => {
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
    persistUsers(JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    persistFriends(JSON.stringify(friends));
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

  const saveFriend = useCallback(
    (friendId: number) => {
      setFriends((friends) => {
        if (!friends.includes(friendId)) {
          return [...friends, friendId];
        }
        return friends;
      });
    },
    [setFriends]
  );

  const saveFriends = useCallback(
    (friendsId: number[]) => {
      setFriends((friends) => [
        ...friends.filter((f) => !friendsId.includes(f)),
        ...friendsId,
      ]);
    },
    [setFriends]
  );

  const friendsList = useMemo(
    () => [...friends.map((x) => findUser(x) as IUser)],
    [friends, findUser]
  );

  return (
    <Provider
      value={{
        findUser,
        saveUser,
        saveUsers,
        friends: friendsList,
        saveFriend,
        saveFriends,
      }}
    >
      {children}
    </Provider>
  );
}
