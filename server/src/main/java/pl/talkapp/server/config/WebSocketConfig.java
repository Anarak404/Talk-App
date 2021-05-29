package pl.talkapp.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final HandshakeHandler handshakeHandler;

    public WebSocketConfig(HandshakeHandler handshakeHandler) {
        this.handshakeHandler = handshakeHandler;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/join").setHandshakeHandler(handshakeHandler);
        registry.addEndpoint("/join").setHandshakeHandler(handshakeHandler).withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/channel");
        registry.setUserDestinationPrefix("/user");
    }

    @Bean
    public SimpMessagingTemplate messagingTemplate() {
        return new SimpMessagingTemplate(new DirectChannel());
    }

}

