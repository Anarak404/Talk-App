import messaging from '@react-native-firebase/messaging';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { IIncomingCall } from '..';
import { IAuthenticationResponse, serverAddress } from '../../api';
import { HttpClient } from '../../api/client';
import { IMessageResponse } from '../../components/messages';
import { checkPermission } from '../../utils/messaging';
import { dataStoreContext } from '../store/DataStoreContext';
import { ISessionContext, ISessionContextProps } from './SessionTypes';

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

  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [client, setClient] = useState<Stomp.Client>();
  const [incomingCall, setIncomingCall] =
    useState<IIncomingCall>(defaultIncomingCall);

  const { saveMessage, saveAuthenticationResponse, wipeData } =
    useContext(dataStoreContext);

  const logIn = useCallback(
    (response: IAuthenticationResponse) => {
      const { token } = response;
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
    checkPermission();
    const unsubscribe = messaging().onMessage(async (m) => {
      Alert.alert('title', 'wiadomosc');
    });
    console.log('subscribe');
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
