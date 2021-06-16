package pl.talkapp.server.eventBus;

import lombok.Value;
import pl.talkapp.server.model.websocket.UserLocation;

import java.util.List;
import java.util.Set;

@Value
public class GeolocationPayload {

    List<UserLocation> usersLocation;
    Set<String> users;

}
