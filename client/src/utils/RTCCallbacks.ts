import React from 'react';
import { MediaStream } from 'react-native-webrtc';
import * as Stomp from 'webstomp-client';
import { PeerConnection } from '../contexts/call/call';
import {
  IAddPeer,
  IIceCandidate,
  ISessionDescription,
} from '../contexts/call/CallTypes';

export const onIceCandidate = (
  peer: React.MutableRefObject<PeerConnection | undefined>
) => {
  return (m: Stomp.Message) => {
    const body: IIceCandidate = JSON.parse(m.body);
    const { iceCandidate } = body;
    peer.current?.addIceCandidate(iceCandidate);
  };
};

export const onSessionDescription = (
  peer: React.MutableRefObject<PeerConnection | undefined>
) => {
  return (m: Stomp.Message) => {
    const body: ISessionDescription = JSON.parse(m.body);
    const { sessionDescription } = body;
    peer.current?.setRemoteDescription(sessionDescription);
  };
};

export const onAddPeer = (
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
