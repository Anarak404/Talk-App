package pl.talkapp.server.model.websocket;

import lombok.Value;

@Value
public class RemovePeer {
    String peerId;
}
