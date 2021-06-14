import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { mediaDevices, MediaStream } from 'react-native-webrtc';
import SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import {
  ICallRequest,
  serverAddress,
  startCall as startCallApi,
} from '../../api';
import { getPosition } from '../../utils/Location';
import { onConnect } from '../../utils/RTCCallbacks';
import { sessionContext } from '../session/SessionContext';
import { dataStoreContext } from '../store/DataStoreContext';
import { IUser } from '../store/DataStoreTypes';
import { PeerConnection } from './call';
import { ICallContext, ICallContextProps } from './CallTypes';
import { IIncomingCall } from './IncomingCallTypes';

const defaultValue: ICallContext = {
  muted: false,
  inCall: false,
  attender: undefined,
  toggleMute: () => void 0,
  endCall: () => void 0,
  startCall: (userId: number) => void 0,
  joinCall: (caller: IIncomingCall) => void 0,
};

export const callContext = createContext<ICallContext>(defaultValue);

const { Provider } = callContext;

const url = `${serverAddress}/join`;

export function CallContextProvider({ children }: ICallContextProps) {
  const [muted, setMuted] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [attender, setAttender] = useState<IUser>();
  const [connection, setConnection] = useState<Stomp.Client>();
  const peer = useRef<PeerConnection>();
  const [stream, setStream] = useState<MediaStream>();

  const { findUser } = useContext(dataStoreContext);
  const { httpClient, token } = useContext(sessionContext);

  useEffect(() => {
    mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((e) => {
        if (typeof e !== 'boolean') {
          setStream(e);
        }
      });
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((v) => !v);
  }, [setMuted]);

  const disconnect = useCallback(() => {
    connection?.send('/app/disconnect', undefined);
    connection?.disconnect();
    setConnection(undefined);
    setInCall(false);
    setAttender(undefined);
    peer.current?.close();
    peer.current = undefined;
  }, [connection, setConnection, setInCall, setAttender, peer]);

  const disconnectWebsocketCallback = useRef(disconnect);

  useEffect(() => {
    disconnectWebsocketCallback.current = disconnect;
  }, [disconnect]);

  const endCall = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const connectToCall = useCallback(
    async (callId: number) => {
      const client = Stomp.over(new SockJS(url));

      client.connect(
        {
          login: token,
        },
        onConnect(client, peer, stream, disconnectWebsocketCallback, callId),
        disconnectWebsocketCallback.current
      );

      setConnection(client);
    },
    [token, peer, disconnectWebsocketCallback, stream, setConnection]
  );

  const startCall = useCallback(
    async (userId: number) => {
      const location: ICallRequest = {};

      try {
        const coordinates = await getPosition();
        location.locationX = coordinates.longitude;
        location.locationY = coordinates.latitude;
      } catch (e) {
        console.log('Unable to get location', e);
      }

      startCallApi(httpClient, userId, location)
        .then((d) => connectToCall(d.id))
        .catch(() => disconnectWebsocketCallback.current());

      setAttender(findUser(userId));
      setInCall(true);
    },
    [
      httpClient,
      connectToCall,
      disconnectWebsocketCallback,
      setAttender,
      findUser,
      setInCall,
    ]
  );

  const joinCall = useCallback(
    (call: IIncomingCall) => {
      connectToCall(call.id);
      setAttender(call.caller);
      setInCall(true);
    },
    [connectToCall, setAttender, setInCall]
  );

  return (
    <Provider
      value={{
        muted,
        inCall,
        attender,
        toggleMute,
        endCall,
        startCall,
        joinCall,
      }}
    >
      {children}
    </Provider>
  );
}
