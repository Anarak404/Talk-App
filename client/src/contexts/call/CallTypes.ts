import React from 'react';
import {
  RTCIceCandidateType,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';

export interface ICallContext {
  muted: boolean;
  inCall: boolean;
  calling: boolean;
  attenderId: number;
  toggleMute(): void;
  endCall(): void;
  startCall(userId: number): void;
  rejectCall(): void;
  answerCall(): void;
}

export interface ICallContextProps {
  children?: React.ReactNode;
}

export interface IAddPeer {
  peerId: number;
  createOffer: boolean;
}

export interface IIceCandidate {
  peerId: number;
  iceCandidate: RTCIceCandidateType;
}

export interface ISessionDescription {
  peerId: number;
  sessionDescription: RTCSessionDescriptionType;
}
