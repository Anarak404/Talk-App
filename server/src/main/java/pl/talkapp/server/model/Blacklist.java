package pl.talkapp.server.model;

import lombok.Value;
import pl.talkapp.server.entity.User;

@Value
public class Blacklist {

    User user;

    boolean muted;

    boolean blocked;

}
