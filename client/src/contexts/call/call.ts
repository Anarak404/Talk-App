import {
  EventOnCandidate,
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCIceCandidateType,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';
import * as Stomp from 'webstomp-client';

export class PeerConnection {
  private connection: RTCPeerConnection;

  constructor(
    private client: Stomp.Client,
    private peerId: number,
    stream: MediaStream | undefined
  ) {
    const onIceCandidate = (e: EventOnCandidate) => {
      const { candidate, sdpMLineIndex } = e.candidate;
      client.send(
        '/app/relayICECandidate',
        JSON.stringify({
          peerId,
          iceCandidate: { candidate, sdpMLineIndex },
        })
      );
    };

    const configuration = {
      iceServers: [{ url: 'stun:stun.l.google.com:19302' }],
    };

    this.connection = new RTCPeerConnection(configuration);
    this.connection.onicecandidate = onIceCandidate;
    if (stream) {
      this.connection.addStream(stream);
    } else {
      console.log('Error, no stream!');
    }
  }

  public async createOffer() {
    console.log('creating offer ' + this.peerId);

    const desc = await this.connection.createOffer();
    await this.connection.setLocalDescription(desc);
    this.client.send(
      '/app/relaySessionDescription',
      JSON.stringify({ peerId: this.peerId, sessionDescription: desc })
    );
  }

  public addIceCandidate(candidate: RTCIceCandidateType) {
    console.log('adding ice candidate');
    this.connection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  public async setRemoteDescription(session: RTCSessionDescriptionType) {
    await this.connection.setRemoteDescription(
      new RTCSessionDescription(session)
    );
    if (session.type === 'offer') {
      console.log('creating answer');
      const description = await this.connection.createAnswer();
      await this.connection.setLocalDescription(description);
      this.client.send(
        '/app/relaySessionDescription',
        JSON.stringify({ peerId: this.peerId, sessionDescription: description })
      );
      console.log('answer send');
    }
  }
}
