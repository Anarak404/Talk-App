package pl.talkapp.server.model;

import lombok.Value;
import pl.talkapp.server.entity.UserBlacklist;

@Value
public class Blacklist {
    UserModel user;

    boolean muted;

    boolean blocked;

    public Blacklist(UserBlacklist blacklist) {
        muted = blacklist.isMuted();
        blocked = blacklist.isBlocked();
        user = new UserModel(blacklist.getBlacklistUser());
    }
}
