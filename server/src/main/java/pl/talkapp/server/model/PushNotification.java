package pl.talkapp.server.model;

import lombok.Value;

@Value
public class PushNotification {

    String body;
    String title;
    String type;
    String subject;

}
