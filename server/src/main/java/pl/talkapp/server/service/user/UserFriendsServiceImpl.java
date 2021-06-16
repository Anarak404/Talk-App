package pl.talkapp.server.service.user;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.entity.UserFriend;
import pl.talkapp.server.repository.UserFriendRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserFriendsServiceImpl implements UserFriendsService {

    private final UserFriendRepository friendRepository;

    public UserFriendsServiceImpl(UserFriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }

    @Override
    public List<UserFriend> getFriends(User user) {
        return friendRepository.getFriendsForUser(user);
    }

    @Override
    public void addFriend(User user, User friend) {
        if (!user.equals(friend)) {
            UserFriend f = new UserFriend(user, friend);
            UserFriend f2 = new UserFriend(friend, user);
            friendRepository.save(f);
            friendRepository.save(f2);
        }
    }

    @Override
    public void deleteFriend(User user, User friend) {
        Optional<UserFriend> f = friendRepository.findByUserAndFriend(user, friend);
        Optional<UserFriend> f2 = friendRepository.findByUserAndFriend(friend, user);
        f.ifPresent(friendRepository::delete);
        f2.ifPresent(friendRepository::delete);
    }
}
