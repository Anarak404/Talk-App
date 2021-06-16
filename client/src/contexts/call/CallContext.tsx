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
import { getPosition } from '../../utils/Location';
import {
  onAddPeer,
  onIceCandidate,
  onSessionDescription,
} from '../../utils/RTCCallbacks';
import { sessionContext } from '../session/SessionContext';
import { dataStoreContext } from '../store/DataStoreContext';
import { IUser } from '../store/DataStoreTypes';
import { PeerConnection } from './call';
import {
  ICallContext,
  ICallContextProps,
  IGeolocation,
  ILocation,
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
  locations: [],
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
  const [locations, setLocations] = useState<IGeolocation[]>([]);
  const setLocationsRef = useRef(setLocations);

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

  const getLocation = useCallback(async () => {
    const location: ILocation = {
      x: null,
      y: null,
    };

    try {
      const coordinates = await getPosition();
      location.x = coordinates.longitude;
      location.y = coordinates.latitude;
    } catch (e) {
      console.log('Unable to get location', e);
    }

    return location;
  }, []);

  const endCall = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const connectToCall = useCallback(
    async (callId: number, location: ILocation) => {
      const client = Stomp.over(new SockJS(url));

      client.connect(
        {
          login: token,
        },
        () => {
          client.subscribe(
            '/user/channel/addPeer',
            onAddPeer(peer, client, stream)
          );
          client.subscribe('/user/channel/ICECandidate', onIceCandidate(peer));
          client.subscribe(
            '/user/channel/sessionDescription',
            onSessionDescription(peer)
          );
          client.subscribe('/user/channel/disconnect', () =>
            disconnectWebsocketCallback.current()
          );
          client.subscribe('/user/channel/geolocation', (m) => {
            const body: IGeolocation[] = JSON.parse(m.body);
            setLocationsRef.current(body);
          });

          client.send(`/app/join`, JSON.stringify({ id: callId, location }));
        },
        disconnectWebsocketCallback.current
      );

      setConnection(client);
    },
    [
      token,
      peer,
      disconnectWebsocketCallback,
      stream,
      setConnection,
      setLocationsRef,
    ]
  );

  const startCall = useCallback(
    async (userId: number) => {
      const location = await getLocation();

      startCallApi(
        httpClient,
        userId,
        location.x && location.y
          ? { locationX: location.x, locationY: location.y }
          : {}
      )
        .then((d) => connectToCall(d.id, location))
        .catch(() => disconnectWebsocketCallback.current());

      setAttender(findUser(userId));
      setInCall(true);
    },
    [
      getLocation,
      httpClient,
      connectToCall,
      disconnectWebsocketCallback,
      setAttender,
      findUser,
      setInCall,
    ]
  );

  const joinCall = useCallback(
    async (call: IIncomingCall) => {
      const location = await getLocation();

      connectToCall(call.id, location);
      setAttender(call.caller);
      setInCall(true);
    },
    [getLocation, connectToCall, setAttender, setInCall]
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
        locations,
      }}
    >
      {children}
    </Provider>
  );
}
