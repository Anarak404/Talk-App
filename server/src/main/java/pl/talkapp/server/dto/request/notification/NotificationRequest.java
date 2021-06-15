package pl.talkapp.server.dto.request.notification;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationRequest {

    String target;

    String title;

    String body;

}
