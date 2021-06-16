package pl.talkapp.server.model.websocket;

import lombok.Value;
import pl.talkapp.server.model.UserModel;

import java.time.LocalDateTime;

@Value
public class Response {

    UserModel sender;
    UserModel receiver;
    String message;
    LocalDateTime dateTime;
    Long id;

}
