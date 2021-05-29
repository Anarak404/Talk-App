package pl.talkapp.server.model.websocket;

import lombok.Value;

@Value
public class AddPeer {
    String peerId;

    boolean createOffer;
}
