package pl.talkapp.server.listener;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import pl.talkapp.server.eventBus.ConnectionPayload;
import pl.talkapp.server.eventBus.JoinChannelEvent;
import pl.talkapp.server.model.websocket.AddPeer;

@Component
public class ChannelListener {

    private final SimpMessagingTemplate template;

    public ChannelListener(SimpMessagingTemplate template) {
        this.template = template;
    }

    @EventListener
    public void handleJoinChannel(JoinChannelEvent<ConnectionPayload> event) {
        ConnectionPayload payload = event.getPayload();

        payload.getChannelMembers().forEach(user ->
                template.convertAndSendToUser(user, "/channel/addPeer",
                        new AddPeer(payload.getUserId(), false))
        );

        template.convertAndSendToUser(payload.getUserId(), "/channel/addPeer",
                new AddPeer(payload.getUserId(), true));
    }

}
