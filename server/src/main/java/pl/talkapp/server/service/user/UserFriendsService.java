package pl.talkapp.server.service.user;

import pl.talkapp.server.entity.User;

import java.util.List;

public interface UserFriendsService {
    List<User> getFriends(User user);
}
