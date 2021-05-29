package pl.talkapp.server.listener;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import pl.talkapp.server.service.call.ConnectionService;

import java.util.Objects;

@Component
public class SessionListener {

    private final ConnectionService connectionService;

    public SessionListener(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());
        String userId = Objects.requireNonNull(headers.getUser()).getName();
        connectionService.disconnect(userId);
    }

}
