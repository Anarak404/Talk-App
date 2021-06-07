package pl.talkapp.server.model.websocket;

import lombok.Value;

@Value
public class IncomingCall {

    Long id;
    Caller caller;

}
