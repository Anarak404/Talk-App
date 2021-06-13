import React from 'react';
import {
  RTCIceCandidateType,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';
import { IUser } from '../store/DataStoreTypes';
import { IIncomingCall } from './IncomingCallTypes';

export interface ICallContext {
  muted: boolean;
  inCall: boolean;
  attender?: IUser;
  toggleMute(): void;
  endCall(): void;
  startCall(userId: number): void;
  joinCall(call: IIncomingCall): void;
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
