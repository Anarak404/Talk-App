package pl.talkapp.server.service.user;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.entity.UserFriend;
import pl.talkapp.server.repository.UserFriendRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserFriendsServiceImpl implements UserFriendsService {

    private final UserFriendRepository friendRepository;

    public UserFriendsServiceImpl(UserFriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }

    @Override
    public List<User> getFriends(User user) {
        return friendRepository.getFriendsForUser(user).stream()
                .map(UserFriend::getFriend)
                .collect(Collectors.toList());
    }
}
