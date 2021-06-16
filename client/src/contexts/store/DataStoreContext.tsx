import { useAsyncStorage } from '@react-native-community/async-storage';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getProfile, IAuthenticationResponse } from '../../api';
import { HttpClient } from '../../api/client';
import {
  IMessageResponse,
  IMessageStore,
} from '../../components/messages/MessageTypes';
import {
  IDataStoreContext,
  IDataStoreContextProps,
  IUser,
} from './DataStoreTypes';

const defaultValue: IDataStoreContext = {
  findUser: (id: number) => undefined,
  saveUser: (user: IUser) => void 0,
  friends: [],
  saveMessage: { current: (message: IMessageResponse) => void 0 },
  getMessages: (user: number) => [],
  saveAuthenticationResponse: (data: IAuthenticationResponse) => void 0,
  me: { id: 0, name: '', photo: null },
  servers: [],
  refetchProfile: (httpClient: HttpClient) => void 0,
};

export const dataStoreContext = createContext<IDataStoreContext>(defaultValue);

const { Provider } = dataStoreContext;

export function DataStoreContextProvider({ children }: IDataStoreContextProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [friends, setFriends] = useState<number[]>([]);
  const [messages, setMessages] = useState<IMessageStore[]>([]);
  const [me, setMe] = useState<IAuthenticationResponse>();

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

  useEffect(() => {
    if (me) {
      setFriends(me.friends.map((f) => f.id));
    }
  }, [me]);

  const findUser = useCallback(
    (id: number) => users.find((u) => u.id === id),
    [users]
  );

  const saveUser = useCallback(
    (user: IUser) =>
      setUsers((users) => [...users.filter((u) => u.id !== user.id), user]),
    [setUsers]
  );

  const saveMessage = useCallback(
    (message: IMessageResponse) => {
      const senderId = message.sender.id;
      const receiverId = message.receiver.id;
      // if my message, set key as receiver id, otherwise senderId
      const key = senderId === me?.user.id ? receiverId : senderId;

      setMessages((m) => {
        const index = m.findIndex((x) => x.key === key);
        const { name, photo } = message.sender;
        const newMessage = {
          id: message.id,
          text: message.message,
          name,
          photo: photo ? photo : undefined,
        };

        if (index === -1) {
          return [...m, { key, messages: [newMessage] }];
        }

        const data = m[index];
        data.messages = [...data.messages, newMessage];
        m.splice(index, 1, data);

        return [...m];
      });
    },
    [me, setMessages]
  );

  const getMessages = useCallback(
    (user: number) => {
      const m = messages.find((x) => x.key === user);
      return m ? [...m.messages] : [];
    },
    [messages]
  );

  const friendsList = useMemo(
    () => [...friends.map((x) => findUser(x) as IUser)],
    [friends, findUser]
  );

  const refetchProfile = useCallback(
    (httpClient: HttpClient) => {
      getProfile(httpClient).then((response) => {
        const { friends, servers, token, user } = response;
        setMe({ friends, servers, token, user });
      });
    },
    [setMe]
  );

  const saveMessageRef = useRef(saveMessage);

  useEffect(() => {
    saveMessageRef.current = saveMessage;
  }, [saveMessage]);

  const saveAuthenticationResponse = useCallback(
    (response: IAuthenticationResponse) => {
      setMe(response);
      setFriends(response.friends.map((f) => f.id));
      setUsers([...response.friends, response.user]);
    },
    [setMe, setFriends, setUsers]
  );

  return (
    <Provider
      value={{
        findUser,
        saveUser,
        friends: friendsList,
        saveMessage: saveMessageRef,
        getMessages,
        saveAuthenticationResponse,
        me: me ? { ...me.user } : { id: 0, name: '', photo: null },
        servers: me ? [...me.servers] : [],
        refetchProfile,
      }}
    >
      {children}
    </Provider>
  );
}
