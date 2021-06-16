package pl.talkapp.server.eventBus;

import lombok.Value;

import java.util.Set;

@Value
public class ConnectionPayload {

    String userId;
    Set<String> channelMembers;

}
