package pl.talkapp.server.dto.request.websocket;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MessageRequest {

    Long receiverId;
    String message;

}
