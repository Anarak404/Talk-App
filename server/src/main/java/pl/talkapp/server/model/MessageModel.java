package pl.talkapp.server.model;

import lombok.Value;

@Value
public class MessageModel {
    UserModel user;

    String message;
}
