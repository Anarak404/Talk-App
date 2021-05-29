package pl.talkapp.server.config;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;
import pl.talkapp.server.service.user.UserService;

import java.security.Principal;
import java.util.Map;

@Component
public class CustomHandshakeHandler extends DefaultHandshakeHandler {

    private final UserService userService;

    public CustomHandshakeHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {
        Long userId = userService.getCurrentUser().getId();
        return new UserPrincipalImpl(String.valueOf(userId));
    }
}
