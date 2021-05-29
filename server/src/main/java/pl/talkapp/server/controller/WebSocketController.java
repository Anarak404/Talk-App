package pl.talkapp.server.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import pl.talkapp.server.dto.request.websocket.JoinRequest;
import pl.talkapp.server.service.call.ConnectionService;

import java.util.Objects;

@Controller
public class WebSocketController {

    private final ConnectionService connectionService;

    public WebSocketController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @MessageMapping("/join")
    public void joinChannel(@Payload JoinRequest req,
                            SimpMessageHeaderAccessor headerAccessor) {
        String userId = Objects.requireNonNull(headerAccessor.getUser()).getName();
        Long channelId = req.getChannelId();

        if (req.isPrivateCall()) {
            connectionService.joinPrivateChannel(channelId, userId);
        } else {
            connectionService.joinServerChannel(channelId, userId);
        }
    }

}
