package pl.talkapp.server.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import pl.talkapp.server.dto.request.IdRequest;
import pl.talkapp.server.dto.request.websocket.ICECandidatePayload;
import pl.talkapp.server.dto.request.websocket.MessageRequest;
import pl.talkapp.server.dto.request.websocket.SessionDescriptionPayload;
import pl.talkapp.server.model.Message;
import pl.talkapp.server.service.call.ConnectionService;
import pl.talkapp.server.service.message.MessageService;

import java.util.Objects;

@Controller
public class WebSocketController {

    private final ConnectionService connectionService;
    private final SimpMessagingTemplate template;
    private final MessageService messageService;

    public WebSocketController(ConnectionService connectionService,
                               SimpMessagingTemplate template, MessageService messageService) {
        this.connectionService = connectionService;
        this.template = template;
        this.messageService = messageService;
    }

    @MessageMapping("/join")
    public void joinChannel(@Payload IdRequest req, SimpMessageHeaderAccessor headerAccessor) {
        String userId = headerAccessor.getUser().getName();
        Long callId = req.getId();
        connectionService.joinCall(callId, userId);
    }

    @MessageMapping("/relayICECandidate")
    public void relayICECandidate(@Payload ICECandidatePayload payload,
                                  SimpMessageHeaderAccessor headerAccessor) {
        String peerId = payload.getPeerId();
        String me = Objects.requireNonNull(headerAccessor.getUser()).getName();

        template.convertAndSendToUser(peerId, "/channel/ICECandidate",
            new ICECandidatePayload(me, payload.getIceCandidate()));
    }

    @MessageMapping("/relaySessionDescription")
    public void relaySessionDescription(@Payload SessionDescriptionPayload payload,
                                        SimpMessageHeaderAccessor headerAccessor) {
        String peerId = payload.getPeerId();
        String me = Objects.requireNonNull(headerAccessor.getUser()).getName();

        template.convertAndSendToUser(peerId, "/channel/sessionDescription",
            new SessionDescriptionPayload(me, payload.getSessionDescription()));
    }

    @MessageMapping("/disconnect")
    public void disconnect(SimpMessageHeaderAccessor headerAccessor) {
        String me = Objects.requireNonNull(headerAccessor.getUser()).getName();
        connectionService.disconnect(me);
    }

    @MessageMapping("/private/message")
    public void sendPrivateMessage(@Payload MessageRequest req,
                                   SimpMessageHeaderAccessor headerAccessor) {
        Long userId = Long.valueOf(headerAccessor.getUser().getName());
        Message message = new Message(userId, req.getReceiverId(), req.getMessage());
        messageService.sendPrivateMessage(message);
    }

    @MessageMapping("/server/message")
    public void sendServerMessage(@Payload MessageRequest req,
                                  SimpMessageHeaderAccessor headerAccessor) {
        Long userId = Long.valueOf(headerAccessor.getUser().getName());
        Message message = new Message(userId, req.getReceiverId(),
            req.getMessage());

        messageService.sendServerMessage(message);
    }

}
