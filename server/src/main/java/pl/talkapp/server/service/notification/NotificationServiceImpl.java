package pl.talkapp.server.service.notification;

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
import pl.talkapp.server.model.PushNotification;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    @Value("${app.firebase-config}")
    private String firebaseConfig;

    private final Map<Long, String> userTokens;

    public NotificationServiceImpl() {
        userTokens = new HashMap<>();
    }

    @PostConstruct
    private void initialize() {
        try {
            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(firebaseConfig).getInputStream()))
                .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            } else {
                FirebaseApp.getInstance();
            }

        } catch (IOException e) {
            log.error("Create Firebase Error: ", e);
        }
    }

    private Message createMessage(PushNotification notification, String token) {
        return Message.builder()
            .setToken(token)
            .setNotification(Notification.builder()
                .setTitle(notification.getTitle())
                .setBody(notification.getBody())
                .build())
            .build();
    }

    @Override
    public void sendNotificationToUser(PushNotification notification, Long userId) {
        String token = userTokens.get(userId);
        if (token != null) {
            Message message = createMessage(notification, token);
            try {
                FirebaseMessaging.getInstance().send(message);
            } catch (FirebaseMessagingException e) {
                log.warn("Push notification failed!", e);
            }
        }
    }

    @Override
    public void sendNotificationToUsers(PushNotification notification, Set<Long> usersIds) {
        usersIds.retainAll(new HashSet<>(userTokens.keySet()));
        List<String> tokens =
            usersIds.stream().map(id -> userTokens.getOrDefault(id, ""))
                .filter(String::isBlank)
                .collect(Collectors.toList());

        for (String token : tokens) {
            Message message = createMessage(notification, token);
            try {
                FirebaseMessaging.getInstance().send(message);
            } catch (FirebaseMessagingException e) {
                log.warn("Push notification failed!", e);
            }
        }
    }

    @Override
    public void registerToken(Long userId, String token) {
        userTokens.put(userId, token);
    }
}
