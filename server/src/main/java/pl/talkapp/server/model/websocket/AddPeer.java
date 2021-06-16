package pl.talkapp.server.model.websocket;

import lombok.Value;

@Value
public class AddPeer {
    Long peerId;

    boolean createOffer;
}
