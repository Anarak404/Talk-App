package pl.talkapp.server.model.websocket;

import lombok.Value;
import pl.talkapp.server.model.Location;

@Value
public class UserLocation {

    String userId;
    Location location;

}
