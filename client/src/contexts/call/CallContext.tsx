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
import { serverAddress, startCall as startCallApi } from '../../api';
import { sessionContext } from '../session/SessionContext';
import { dataStoreContext } from '../store/DataStoreContext';
import { IUser } from '../store/DataStoreTypes';
import { PeerConnection } from './call';
import {
  IAddPeer,
  ICallContext,
  ICallContextProps,
  IIceCandidate,
  ISessionDescription,
} from './CallTypes';
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
  }, [setConnection, setInCall, setAttender, connection]);

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
        () => {
          // TODO: change subscribe path
          client.subscribe('/user/channel/addPeer', (m) => {
            const body: IAddPeer = JSON.parse(m.body);
            const { peerId, createOffer } = body;
            const peerConnection = new PeerConnection(client, peerId, stream);
            if (createOffer) {
              peerConnection.createOffer();
            }
            peer.current = peerConnection;
          });
          client.subscribe('/user/channel/ICECandidate', (m) => {
            const body: IIceCandidate = JSON.parse(m.body);
            const { iceCandidate } = body;
            peer.current?.addIceCandidate(iceCandidate);
          });
          client.subscribe('/user/channel/sessionDescription', (m) => {
            const body: ISessionDescription = JSON.parse(m.body);
            const { sessionDescription } = body;
            peer.current?.setRemoteDescription(sessionDescription);
          });
          client.subscribe('/user/channel/disconnect', () =>
            disconnectWebsocketCallback.current()
          );
          client.send(`/app/join`, JSON.stringify({ id: callId }));
        },
        () => disconnect()
      );

      setConnection(client);
    },
    [setConnection, token, PeerConnection, disconnect]
  );

  const startCall = useCallback(
    (userId: number) => {
      startCallApi(httpClient, userId, {})
        .then((d) => connectToCall(d.id))
        .catch(() => disconnect());

      setAttender(findUser(userId));
      setInCall(true);
    },
    [setInCall, setAttender, startCallApi, connectToCall, disconnect]
  );

  const joinCall = useCallback(
    (call: IIncomingCall) => {
      connectToCall(call.id);
      setAttender(call.caller);
      setInCall(true);
    },
    [connectToCall]
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
