import React from 'react';
import { MediaStream } from 'react-native-webrtc';
import * as Stomp from 'webstomp-client';
import { PeerConnection } from '../contexts/call/call';
import {
  IAddPeer,
  IIceCandidate,
  ISessionDescription,
} from '../contexts/call/CallTypes';

const onIceCandidate = (
  peer: React.MutableRefObject<PeerConnection | undefined>
) => {
  return (m: Stomp.Message) => {
    const body: IIceCandidate = JSON.parse(m.body);
    const { iceCandidate } = body;
    peer.current?.addIceCandidate(iceCandidate);
  };
};

const onSessionDescription = (
  peer: React.MutableRefObject<PeerConnection | undefined>
) => {
  return (m: Stomp.Message) => {
    const body: ISessionDescription = JSON.parse(m.body);
    const { sessionDescription } = body;
    peer.current?.setRemoteDescription(sessionDescription);
  };
};

const onAddPeer = (
  peer: React.MutableRefObject<PeerConnection | undefined>,
  client: Stomp.Client,
  stream: MediaStream | undefined
) => {
  return (m: Stomp.Message) => {
    const body: IAddPeer = JSON.parse(m.body);
    const { peerId, createOffer } = body;
    const peerConnection = new PeerConnection(client, peerId, stream);
    if (createOffer) {
      peerConnection.createOffer();
    }
    peer.current = peerConnection;
  };
};

export const onConnect = (
  client: Stomp.Client,
  peer: React.MutableRefObject<PeerConnection | undefined>,
  stream: MediaStream | undefined,
  disconnectCallback: React.MutableRefObject<() => void>,
  callId: number
) => {
  return () => {
    client.subscribe('/user/channel/addPeer', onAddPeer(peer, client, stream));
    client.subscribe('/user/channel/ICECandidate', onIceCandidate(peer));
    client.subscribe(
      '/user/channel/sessionDescription',
      onSessionDescription(peer)
    );
    client.subscribe('/user/channel/disconnect', () =>
      disconnectCallback.current()
    );

    client.send(`/app/join`, JSON.stringify({ id: callId }));
  };
};
