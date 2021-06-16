import messaging from '@react-native-firebase/messaging';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { IIncomingCall } from '..';
import { IAuthenticationResponse, serverAddress } from '../../api';
import { HttpClient } from '../../api/client';
import { IMessageResponse } from '../../components/messages';
import { IServerMessageResponse } from '../../components/messages/MessageTypes';
import { checkPermission } from '../../utils/messaging';
import { showNotification } from '../../utils/Notifications';
import { settingsContext } from '../settings/SettingsContext';
import { dataStoreContext } from '../store/DataStoreContext';
import {
  ISessionContext,
  ISessionContextProps,
  SubscribedChannel,
} from './SessionTypes';

const defaultIncomingCall: IIncomingCall = {
  id: 0,
  caller: {
    id: 0,
    name: '',
    photo: null,
  },
};

const defaultValue: ISessionContext = {
  loggedIn: false,
  logIn: (user: IAuthenticationResponse) => void 0,
  httpClient: new HttpClient(''),
  token: '',
  isIncomingCall: false,
  incomingCall: defaultIncomingCall,
  rejectOrAnswerCall: () => void 0,
  websocket: undefined,
  logout: () => void 0,
};

export const sessionContext = createContext<ISessionContext>(defaultValue);

const { Provider } = sessionContext;

export function SessionContextProvider({ children }: ISessionContextProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [httpClient, setHttpClient] = useState<HttpClient>();
  const [token, setToken] = useState('');
  const [subscribedChannels, setSubscribedChannels] = useState<
    SubscribedChannel[]
  >([]);

  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [client, setClient] = useState<Stomp.Client>();
  const [incomingCall, setIncomingCall] =
    useState<IIncomingCall>(defaultIncomingCall);

  const {
    saveMessage,
    saveAuthenticationResponse,
    wipeData,
    servers,
    saveServerMessage,
    refetchProfile,
  } = useContext(dataStoreContext);

  const { getString } = useContext(settingsContext);

  const logIn = useCallback(
    (response: IAuthenticationResponse) => {
      const { token, servers } = response;
      setLoggedIn(true);
      setToken(token);
      saveAuthenticationResponse(response);
      setHttpClient(new HttpClient(token));

      const url = `${serverAddress}/connect`;
      const client = Stomp.over(new SockJS(url));

      client.connect(
        { login: token },
        () => {
          client.subscribe('/user/call', (m) => {
            const body: IIncomingCall = JSON.parse(m.body);
            setIncomingCall(body);
            setIsIncomingCall(true);
          });

          client.subscribe('/user/messages', (response) => {
            const body: IMessageResponse = JSON.parse(response.body);
            saveMessage.current(body);
          });

          setSubscribedChannels([
            ...servers.map((s) => {
              return {
                id: s.id,
                subscription: client.subscribe(`/messages/${s.id}`, (m) => {
                  const body: IServerMessageResponse = JSON.parse(m.body);
                  saveServerMessage.current(s.id, body);
                }),
              };
            }),
          ]);
        },
        () => {
          console.log('ERROR!');
        }
      );

      setClient(client);
    },
    [
      setClient,
      setIncomingCall,
      setIsIncomingCall,
      httpClient,
      setLoggedIn,
      setToken,
      saveMessage,
      setHttpClient,
    ]
  );

  const rejectOrAnswerCall = useCallback(() => {
    setIsIncomingCall(false);
    setIncomingCall(defaultIncomingCall);
  }, [setIncomingCall, setIsIncomingCall]);

  const logout = useCallback(() => {
    setLoggedIn(false);
    setToken('');
    setHttpClient(undefined);
    setClient((c) => {
      if (c) {
        if (c.connected) {
          c.disconnect();
        }
        return undefined;
      }
    });
    wipeData();
  }, [setLoggedIn, setToken, setHttpClient, setClient, wipeData]);

  useEffect(
    () => () => {
      if (client && client.connected) {
        client.disconnect();
      }
    },
    []
  );

  useEffect(() => {
    if (client && client.connected) {
      const serversIds = servers.map((s) => s.id);
      const subscribedChannelsIds = subscribedChannels.map((s) => s.id);

      const newChannels = servers.filter(
        (c) => !subscribedChannelsIds.includes(c.id)
      );

      const deletedChannels = subscribedChannels.filter(
        (s) => !serversIds.includes(s.id)
      );

      deletedChannels.forEach((c) => c.subscription.unsubscribe());
      const newSubsriptions = newChannels.map((c) => {
        return {
          id: c.id,
          subscription: client.subscribe(`/messages/${c.id}`, (m) => {
            const body: IServerMessageResponse = JSON.parse(m.body);
            saveServerMessage.current(c.id, body);
          }),
        };
      });

      setSubscribedChannels([
        ...newSubsriptions,
        ...subscribedChannels.filter((s) => !deletedChannels.includes(s)),
      ]);
    }
  }, [servers, client]);

  const refetchToolkit = useRef({ refetchProfile, httpClient, getString });

  useEffect(() => {
    refetchToolkit.current = { httpClient, refetchProfile, getString };
  }, [httpClient, refetchProfile, getString]);

  useEffect(() => {
    checkPermission();
    const unsubscribe = messaging().onMessage(async (m) => {
      const { httpClient, refetchProfile, getString } = refetchToolkit.current;

      const data = m.data as {
        subject: string;
        type: 'FRIEND' | 'SERVER';
      };

      const message = getString(
        data.type === 'FRIEND'
          ? 'addFriendPushNotification'
          : 'joinServerPushNotification'
      );
      const title = getString(
        data.type === 'FRIEND'
          ? 'addFriendPushNotificationTitle'
          : 'joinServerPushNotificationTitle'
      );

      showNotification(data.subject + ' ' + message, title);

      if (httpClient) {
        console.log('poszlo');
        refetchProfile(httpClient);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Provider
      value={{
        loggedIn,
        httpClient: httpClient ? httpClient : new HttpClient(''),
        logIn,
        token,
        isIncomingCall,
        incomingCall,
        rejectOrAnswerCall,
        websocket: client,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}
