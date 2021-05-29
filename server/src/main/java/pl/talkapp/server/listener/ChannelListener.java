package pl.talkapp.server.listener;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import pl.talkapp.server.eventBus.ConnectionPayload;
import pl.talkapp.server.eventBus.DisconnectChannelEvent;
import pl.talkapp.server.eventBus.JoinChannelEvent;
import pl.talkapp.server.model.websocket.AddPeer;
import pl.talkapp.server.model.websocket.RemovePeer;

@Component
public class ChannelListener {

    private final SimpMessagingTemplate template;

    public ChannelListener(SimpMessagingTemplate template) {
        this.template = template;
    }

    @EventListener
    public void handleJoinChannel(JoinChannelEvent<ConnectionPayload> event) {
        ConnectionPayload payload = event.getPayload();

        payload.getChannelMembers().forEach(user -> {
            template.convertAndSendToUser(user, "/channel/addPeer",
                    new AddPeer(payload.getUserId(), false));
            template.convertAndSendToUser(payload.getUserId(), "/channel/addPeer",
                    new AddPeer(user, true));
        });
    }

    @EventListener
    public void handleDisconnect(DisconnectChannelEvent<ConnectionPayload> event) {
        ConnectionPayload payload = event.getPayload();
        String id = payload.getUserId();

        payload.getChannelMembers().forEach(user -> {
            template.convertAndSendToUser(user, "/channel/disconnect", new RemovePeer(id));
            template.convertAndSendToUser(id, "/channel/disconnect", new RemovePeer(user));
        });
    }

}
