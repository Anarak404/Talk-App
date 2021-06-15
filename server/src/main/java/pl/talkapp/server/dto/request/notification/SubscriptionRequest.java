package pl.talkapp.server.dto.request.notification;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SubscriptionRequest {

    String topicName;

    List<String> tokens;

}
