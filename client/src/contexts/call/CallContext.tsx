import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { mediaDevices, MediaStream } from 'react-native-webrtc';
import SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { startCall as startCallApi } from '../../api';
import { sessionContext } from '../session/SessionContext';
import { PeerConnection } from './call';
import {
  IAddPeer,
  ICallContext,
  ICallContextProps,
  IIceCandidate,
  ISessionDescription,
} from './CallTypes';

const defaultValue: ICallContext = {
  muted: false,
  inCall: false,
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
  const [attenderId, setAttenderId] = useState(0);
  const [connection, setConnection] = useState<Stomp.Client>();
  const [peer, setPeer] = useState<PeerConnection>();
  const [stream, setStream] = useState<MediaStream>();

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

  const { httpClient, token } = useContext(sessionContext);

  const toggleMute = useCallback(() => {
    setMuted((v) => !v);
  }, [setMuted]);

  const endCall = useCallback(() => {
    setInCall(false);
  }, [setInCall]);

  const disconnect = useCallback(() => {
    connection?.disconnect();
    setConnection(undefined);
    setInCall(false);
    setAttenderId(0);
  }, [setConnection, setInCall, setAttenderId, connection]);

  const connectToCall = useCallback(
    async (callId: number) => {
      const client = Stomp.over(new SockJS(url));

      client.connect(
        {
          login: token,
        },
        () => {
          client.subscribe('/channel/addPeer', (m) => {
            const body: IAddPeer = JSON.parse(m.body);
            const { peerId, createOffer } = body;
            const peerConnection = new PeerConnection(client, peerId, stream);

            if (createOffer) {
              peerConnection.createOffer();
            }
          });

          client.subscribe('/channel/ICECandidate', (m) => {
            const body: IIceCandidate = JSON.parse(m.body);
            const { iceCandidate } = body;
            peer?.addIceCandidate(iceCandidate);
          });

          client.subscribe('/channel/sessionDescription', (m) => {
            const body: ISessionDescription = JSON.parse(m.body);
            const { sessionDescription } = body;
            peer?.setRemoteDescription(sessionDescription);
          });

          client.send(`/app/join`, JSON.stringify({ id: callId }));
        },
        () => disconnect()
      );

      setConnection(client);
    },
    [setConnection, token, PeerConnection]
  );

  const startCall = useCallback(
    (userId: number) => {
      startCallApi(httpClient, userId, {})
        .then((d) => connectToCall(d.id))
        .catch(() => disconnect());

      setAttenderId(userId);
      setInCall(true);
    },
    [setInCall, setAttenderId, startCallApi, connectToCall, disconnect]
  );

  const answerCall = useCallback(() => {
    setInCall(true);
  }, [setInCall]);

  const rejectCall = useCallback(() => {}, []);

  return (
    <Provider
      value={{
        muted,
        inCall,
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
