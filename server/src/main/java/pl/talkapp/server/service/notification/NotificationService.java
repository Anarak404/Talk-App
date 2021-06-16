package pl.talkapp.server.service.notification;

import pl.talkapp.server.model.PushNotification;

import java.util.Set;

public interface NotificationService {

    void sendNotificationToUser(PushNotification notification, Long userId);
    void sendNotificationToUsers(PushNotification notification, Set<Long> usersIds);
    void registerToken(Long userId, String token);

}
