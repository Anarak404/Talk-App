package pl.talkapp.server.service;

import pl.talkapp.server.dto.request.notification.NotificationRequest;
import pl.talkapp.server.dto.request.notification.SubscriptionRequest;

public interface NotificationService {
    void subscribeToTopic(SubscriptionRequest subscriptionRequest);

    void unsubscribeFromTopic(SubscriptionRequest subscriptionRequest);

    String sendPsnToDevice(NotificationRequest notificationRequest);

    String sendPsnToTopic(NotificationRequest notificationRequest);
}
