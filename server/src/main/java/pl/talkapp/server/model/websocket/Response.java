package pl.talkapp.server.model.websocket;

import lombok.Value;

import java.time.LocalDateTime;

@Value
public class Response {

    Sender sender;
    String message;
    LocalDateTime dateTime;

}
