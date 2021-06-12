import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { IIncomingCall } from '..';
import { IAuthenticationResponse, serverAddress } from '../../api';
import { HttpClient } from '../../api/client';
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
  httpClient: new HttpClient(),
  token: '',
  isIncomingCall: false,
  incomingCall: defaultIncomingCall,
  rejectOrAnswerCall: () => void 0,
  websocket: undefined,
};

export const sessionContext = createContext<ISessionContext>(defaultValue);

const { Provider } = sessionContext;

export function SessionContextProvider({ children }: ISessionContextProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [httpClient] = useState(new HttpClient());
  const [token, setToken] = useState('');

  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [client, setClient] = useState<Stomp.Client>();
  const [incomingCall, setIncomingCall] =
    useState<IIncomingCall>(defaultIncomingCall);

  const { saveUsers, saveFriends } = useContext(dataStoreContext);

  const logIn = useCallback(
    ({ token, user, friends, servers }: IAuthenticationResponse) => {
      setLoggedIn(true);
      setToken(token);
      saveUsers([user, ...friends]);
      saveFriends([...friends.map((f) => f.id)]);
      // todo: save servers
      httpClient.token = token;

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
    ]
  );

  const rejectOrAnswerCall = useCallback(() => {
    setIsIncomingCall(false);
    setIncomingCall(defaultIncomingCall);
  }, [setIncomingCall, setIsIncomingCall]);

  useEffect(
    () => () => {
      if (client && client.connected) {
        client.disconnect();
      }
    },
    []
  );

  return (
    <Provider
      value={{
        loggedIn,
        httpClient,
        logIn,
        token,
        isIncomingCall,
        incomingCall,
        rejectOrAnswerCall,
        websocket: client,
      }}
    >
      {children}
    </Provider>
  );
}
