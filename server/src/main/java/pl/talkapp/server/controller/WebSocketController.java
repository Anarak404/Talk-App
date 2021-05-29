package pl.talkapp.server.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import pl.talkapp.server.dto.request.websocket.ICECandidatePayload;
import pl.talkapp.server.dto.request.websocket.JoinRequest;
import pl.talkapp.server.dto.request.websocket.SessionDescriptionPayload;
import pl.talkapp.server.service.call.ConnectionService;

import java.util.Objects;

@Controller
public class WebSocketController {

    private final ConnectionService connectionService;
    private final SimpMessagingTemplate template;

    public WebSocketController(ConnectionService connectionService,
                               SimpMessagingTemplate template) {
        this.connectionService = connectionService;
        this.template = template;
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

    @MessageMapping("/relayICECandidate")
    public void relayICECandidate(@Payload ICECandidatePayload payload,
                                  SimpMessageHeaderAccessor headerAccessor) {
        String peerId = payload.getPeerId();
        String me = Objects.requireNonNull(headerAccessor.getUser()).getName();

        template.convertAndSendToUser(peerId, "/channel/relayICECandidate",
                new ICECandidatePayload(me, payload.getIceCandidate()));
    }

    @MessageMapping("/relaySessionDescription")
    public void relaySessionDescription(@Payload SessionDescriptionPayload payload,
                                        SimpMessageHeaderAccessor headerAccessor) {
        String peerId = payload.getPeerId();
        String me = Objects.requireNonNull(headerAccessor.getUser()).getName();

        template.convertAndSendToUser(peerId, "/channel/relaySessionDescription",
                new SessionDescriptionPayload(me, payload.getSessionDescription()));
    }

    @MessageMapping("/disconnect")
    public void disconnect(SimpMessageHeaderAccessor headerAccessor) {
        String me = Objects.requireNonNull(headerAccessor.getUser()).getName();
        connectionService.disconnect(me);
    }

}
