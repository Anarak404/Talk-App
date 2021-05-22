package pl.talkapp.server.service.user;

import pl.talkapp.server.entity.User;

import java.util.List;

public interface UserFriendsService {
    List<User> getFriends(User user);

    void addFriend(User user, User friend);

    void deleteFriend(User user, User friend);
}
