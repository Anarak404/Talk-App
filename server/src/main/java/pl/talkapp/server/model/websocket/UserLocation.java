package pl.talkapp.server.model.websocket;

import lombok.Value;
import pl.talkapp.server.model.Location;

@Value
public class UserLocation {

    Long userId;
    Location location;

}
