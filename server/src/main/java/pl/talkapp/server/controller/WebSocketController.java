package pl.talkapp.server.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import pl.talkapp.server.dto.request.JoinWebSocketRequest;

@Controller
public class WebSocketController {

    @MessageMapping("/join")
    public void joinChannel(@Payload JoinWebSocketRequest req,
                            SimpMessageHeaderAccessor headerAccessor) {

    }

}
