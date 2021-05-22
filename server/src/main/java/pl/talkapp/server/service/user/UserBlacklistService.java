package pl.talkapp.server.service.user;

import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.Blacklist;

import java.util.List;

public interface UserBlacklistService {
    List<Blacklist> getBlacklistUsers(User user);
}
