import React, { createContext, useCallback, useContext, useState } from 'react';
import SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { sessionContext } from '../session/SessionContext';
import { ICallContext, ICallContextProps } from './CallTypes';
import { startCall as startCallApi } from '../../api';

const defaultValue: ICallContext = {
  muted: false,
  inCall: false,
  calling: false,
  attenderId: 0,
  toggleMute: () => void 0,
  endCall: () => void 0,
  startCall: (userId: number) => void 0,
  answerCall: () => void 0,
  rejectCall: () => void 0,
};

export const callContext = createContext<ICallContext>(defaultValue);

const { Provider } = callContext;

const url = 'http://192.168.0.73:8080/join';

export function CallContextProvider({ children }: ICallContextProps) {
  const [muted, setMuted] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [calling, setCalling] = useState(false);
  const [attenderId, setAttenderId] = useState(0);
  const [connection, setConnection] = useState<Stomp.Client>();

  const { httpClient } = useContext(sessionContext);

  const toggleMute = useCallback(() => {
    setMuted((v) => !v);
  }, [setMuted]);

  const endCall = useCallback(() => {
    setInCall(false);
  }, [setInCall]);

  const connectToCall = useCallback(
    (id: number) => {
      const client = Stomp.over(new SockJS(url));
      console.log(id);
      setConnection(client);
    },
    [setConnection]
  );

  const startCall = useCallback(
    (userId: number) => {
      startCallApi(httpClient, userId, {})
        .then((d) => connectToCall(d.id))
        .catch((e) => {
          setAttenderId(0);
          setInCall(false);
        });

      setAttenderId(userId);
      setInCall(true);
    },
    [setInCall, setAttenderId, startCallApi, connectToCall]
  );

  const answerCall = useCallback(() => {
    setCalling(false);
    setInCall(true);
  }, [setCalling, setInCall]);

  const rejectCall = useCallback(() => {
    setCalling(false);
  }, [setCalling]);

  return (
    <Provider
      value={{
        muted,
        inCall,
        calling,
        attenderId,
        toggleMute,
        endCall,
        startCall,
        answerCall,
        rejectCall,
      }}
    >
      {children}
    </Provider>
  );
}
