package pl.talkapp.server.service.call;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Call;
import pl.talkapp.server.eventBus.ConnectionPayload;
import pl.talkapp.server.eventBus.DisconnectChannelEvent;
import pl.talkapp.server.eventBus.GeolocationEvent;
import pl.talkapp.server.eventBus.GeolocationPayload;
import pl.talkapp.server.eventBus.JoinChannelEvent;
import pl.talkapp.server.model.Location;
import pl.talkapp.server.model.websocket.UserLocation;
import pl.talkapp.server.repository.CallRepository;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class ConnectionServiceImpl implements ConnectionService {

    // key = callId, value = Map<userId, Location>
    private final Map<String, Map<String, Location>> channels;

    // key = user id, value = channel (empty string if no channel)
    private final Map<String, String> connections;

    private final ApplicationEventPublisher eventPublisher;
    private final CallService callService;
    private final CallRepository callRepository;

    public ConnectionServiceImpl(ApplicationEventPublisher eventPublisher,
                                 CallService callService, CallRepository callRepository) {
        this.eventPublisher = eventPublisher;
        this.callService = callService;
        this.callRepository = callRepository;
        channels = new ConcurrentHashMap<>();
        connections = new ConcurrentHashMap<>();
    }

    private Set<String> join(String channel, String userId, Location location) {
        Map<String, Location> users = channels.getOrDefault(channel,
            new ConcurrentHashMap<>());
        Set<String> members = new HashSet<>(users.keySet());

        users.put(userId, location);
        channels.put(channel, users);
        return members;
    }

    @Override
    public void joinCall(Long callId, String userId, Location location) {
        String channel = callId.toString();
        Set<String> members = join(channel, userId, location);
        connections.put(userId, channel);

        eventPublisher.publishEvent(new JoinChannelEvent<>(this, new ConnectionPayload(userId,
            members)));

        Map<String, Location> userData = channels.get(channel);
        if (userData != null) {
            List<UserLocation> usersLocation =
                userData.entrySet().stream()
                    .map(e -> new UserLocation(e.getKey(), e.getValue()))
                    .collect(Collectors.toList());

            eventPublisher.publishEvent(new GeolocationEvent<>(this,
                new GeolocationPayload(usersLocation, userData.keySet())));
        }
    }

    @Override
    public void disconnect(String userId) {
        String channel = connections.get(userId);

        if (channel != null) {
            Map<String, Location> members = channels.getOrDefault(channel, new HashMap<>());
            members.remove(userId);

            // remove channel if no users connected
            if (members.isEmpty()) {
                channels.remove(channel);
                Optional<Call> call = callRepository.findById(Long.valueOf(channel));
                call.ifPresent(callService::endCall);
            }

            // notify connected users about disconnect of member
            eventPublisher.publishEvent(new DisconnectChannelEvent<>(this,
                new ConnectionPayload(userId, new HashSet<>(members.keySet()))));
        }

        connections.remove(userId);
    }
}
