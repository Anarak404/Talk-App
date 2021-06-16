package pl.talkapp.server.model;

import lombok.Value;

@Value
public class Message {

    Long senderId;
    Long receiverId;
    String content;

}
