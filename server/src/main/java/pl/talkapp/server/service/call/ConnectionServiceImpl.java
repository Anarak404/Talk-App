package pl.talkapp.server.service.call;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Call;
import pl.talkapp.server.eventBus.ConnectionPayload;
import pl.talkapp.server.eventBus.DisconnectChannelEvent;
import pl.talkapp.server.eventBus.JoinChannelEvent;
import pl.talkapp.server.repository.CallRepository;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ConnectionServiceImpl implements ConnectionService {

    // key = callId, value = Set of users id
    private final Map<String, Set<String>> channels;

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
    public void joinCall(Long callId, String userId) {
        String channel = callId.toString();
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
                Optional<Call> call = callRepository.findById(Long.valueOf(channel));
                call.ifPresent(callService::endCall);
            }

            // notify connected users about disconnect of member
            eventPublisher.publishEvent(new DisconnectChannelEvent<>(this,
                    new ConnectionPayload(userId, Set.copyOf(members))));
        }

        connections.remove(userId);
    }
}
