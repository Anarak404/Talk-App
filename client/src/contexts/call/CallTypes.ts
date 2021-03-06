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
  locations: IGeolocation[];
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

export interface IRemovePeer {
  peerId: number;
}

export interface ILocation {
  x: number | null;
  y: number | null;
}

export interface IGeolocation {
  userId: number;
  location: ILocation;
}
