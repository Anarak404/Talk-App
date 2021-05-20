package pl.talkapp.server.service.call;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import pl.talkapp.server.eventBus.ChannelEvent;
import pl.talkapp.server.eventBus.ConnectionPayload;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class ConnectionServiceImpl implements ConnectionService {

    private final static String privatePrefix = "p";
    private final static String serverPrefix = "s";

    // key = channel, value = Set of session ids
    private final Map<String, Set<String>> channels;

    // key = session id, value = channel
    private final Map<String, String> connections;

    private final ApplicationEventPublisher eventPublisher;

    public ConnectionServiceImpl(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
        channels = new HashMap<>();
        connections = new HashMap<>();
    }

    private String channelName(String prefix, long id) {
        return String.format("%s-%d", prefix, id);
    }

    private void join(String channel, String sessionId) {
        Set<String> sessions = channels.getOrDefault(channel, new HashSet<>());
        sessions.add(sessionId);
        Set<String> members = channels.put(channel, sessions);

        eventPublisher.publishEvent(new ChannelEvent<>(this, new ConnectionPayload(sessionId,
            members)));
    }

    @Override
    public void joinPrivateChannel(long channelId, String sessionId) {
        String channel = channelName(privatePrefix, channelId);
        join(channel, sessionId);
        connections.put(sessionId, channel);
    }

    @Override
    public void joinServerChannel(long serverId, String sessionId) {
        String channel = channelName(serverPrefix, serverId);
        join(channel, sessionId);
        connections.put(sessionId, channel);
    }

    @Override
    public void disconnect(String sessionId) {
        String channel = connections.get(sessionId);

        if (channel != null) {
            Set<String> members = channels.getOrDefault(channel, new HashSet<>());
            members.remove(sessionId);

            // remove channel if no users connected
            if (members.isEmpty()) {
                channels.remove(channel);
            }

            // notify connected users about disconnect of member
            eventPublisher.publishEvent(new ChannelEvent<>(this, new ConnectionPayload(sessionId,
                members)));
        }

        connections.remove(sessionId);
    }
}
