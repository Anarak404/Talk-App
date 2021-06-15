package pl.talkapp.server.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.talkapp.server.dto.request.notification.NotificationRequest;
import pl.talkapp.server.dto.request.notification.SubscriptionRequest;
import pl.talkapp.server.service.NotificationService;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/subscribe")
    public void subscribeToTopic(@RequestBody SubscriptionRequest subscriptionRequest) {
        notificationService.subscribeToTopic(subscriptionRequest);
    }

    @PostMapping("/unsubscribe")
    public void unsubscribeFromTopic(@RequestBody SubscriptionRequest subscriptionRequest) {
        notificationService.unsubscribeFromTopic(subscriptionRequest);
    }

    @PostMapping("/token")
    public String sendPnsToDevice(@RequestBody NotificationRequest notificationRequest) {
        return notificationService.sendPsnToDevice(notificationRequest);
    }

    @PostMapping("/topic")
    public String sendPnsToTopic(@RequestBody NotificationRequest notificationRequest) {
        return notificationService.sendPsnToTopic(notificationRequest);
    }
}
