package pl.talkapp.server.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import pl.talkapp.server.dto.request.notification.NotificationRequest;
import pl.talkapp.server.dto.request.notification.SubscriptionRequest;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Service
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    @Value("${app.firebase-config}")
    private String firebaseConfig;

    private FirebaseApp firebaseApp;

    @PostConstruct
    private void initialize() {
        try {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(firebaseConfig).getInputStream()))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                this.firebaseApp = FirebaseApp.initializeApp(options);
            } else {
                this.firebaseApp = FirebaseApp.getInstance();
            }

        } catch (IOException e) {
            log.error("Create Firebase Error: ", e);
        }
    }

    @Override
    public void subscribeToTopic(SubscriptionRequest subscriptionRequest) {
        try {
            FirebaseMessaging.getInstance(firebaseApp)
                    .subscribeToTopic(subscriptionRequest.getTokens(),
                            subscriptionRequest.getTopicName());
        } catch (FirebaseMessagingException e) {
            log.error("Firebase subscribe to topic fail", e);
        }
    }

    @Override
    public void unsubscribeFromTopic(SubscriptionRequest subscriptionRequest) {
        try {
            FirebaseMessaging.getInstance(firebaseApp)
                    .unsubscribeFromTopic(subscriptionRequest.getTokens(),
                            subscriptionRequest.getTopicName());
        } catch (FirebaseMessagingException e) {
            log.error("Firebase unsubscribe from topic fail", e);
        }
    }

    @Override
    public String sendPsnToDevice(NotificationRequest notificationRequest) {
        Message message = Message.builder()
                .setToken(notificationRequest.getTarget())
                .setNotification(Notification.builder()
                        .setTitle(notificationRequest.getTitle())
                        .setBody(notificationRequest.getBody())
                        .build())
                .putData("content", notificationRequest.getTitle())
                .putData("body", notificationRequest.getBody())
                .build();

        String response = null;
        try {
            response = FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            log.error("Failed to send firebase notification: ", e);
        }
        return response;
    }

    @Override
    public String sendPsnToTopic(NotificationRequest notificationRequest) {
        Notification.builder().build();

        Message message = Message.builder()
                .setTopic(notificationRequest.getTarget())
                .setNotification(Notification.builder()
                        .setTitle(notificationRequest.getTitle())
                        .setBody(notificationRequest.getBody())
                        .build())
                .putData("content", notificationRequest.getTitle())
                .putData("body", notificationRequest.getBody())
                .build();

        String response = null;
        try {
            response = FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            log.error("Failed to send firebase notification: ", e);
        }
        return response;
    }
}
