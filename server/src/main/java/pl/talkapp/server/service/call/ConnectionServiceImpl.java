package pl.talkapp.server.service.call;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import pl.talkapp.server.eventBus.ConnectionPayload;
import pl.talkapp.server.eventBus.DisconnectChannelEvent;
import pl.talkapp.server.eventBus.JoinChannelEvent;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ConnectionServiceImpl implements ConnectionService {

    private final static String privatePrefix = "p";
    private final static String serverPrefix = "s";

    // key = channel, value = Set of users id
    private final Map<String, Set<String>> channels;

    // key = user id, value = channel
    private final Map<String, String> connections;

    private final ApplicationEventPublisher eventPublisher;

    public ConnectionServiceImpl(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
        channels = new ConcurrentHashMap<>();
        connections = new ConcurrentHashMap<>();
    }

    private String channelName(String prefix, long id) {
        return String.format("%s-%d", prefix, id);
    }

    private void join(String channel, String userId) {
        Set<String> ids = channels.getOrDefault(channel,
                Collections.synchronizedSet(new HashSet<>()));
        Set<String> members = Set.copyOf(ids);

        ids.add(userId);
        channels.put(channel, ids);

        eventPublisher.publishEvent(new JoinChannelEvent<>(this, new ConnectionPayload(userId,
                members)));
    }

    @Override
    public void joinPrivateChannel(long channelId, String userId) {
        String channel = channelName(privatePrefix, channelId);
        join(channel, userId);
        connections.put(userId, channel);
    }

    @Override
    public void joinServerChannel(long serverId, String userId) {
        String channel = channelName(serverPrefix, serverId);
        join(channel, userId);
        connections.put(userId, channel);
    }

    @Override
    public void disconnect(String userId) {
        String channel = connections.get(userId);

        if (channel != null) {
            Set<String> members = channels.getOrDefault(channel, new HashSet<>());
            members.remove(userId);

            // remove channel if no users connected
            if (members.isEmpty()) {
                channels.remove(channel);
            }

            // notify connected users about disconnect of member
            eventPublisher.publishEvent(new DisconnectChannelEvent<>(this,
                    new ConnectionPayload(userId,
                    members)));
        }

        connections.remove(userId);
    }
}
