package pl.talkapp.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.entity.UserFriend;
import pl.talkapp.server.entity.UserFriendKey;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFriendRepository extends CrudRepository<UserFriend, UserFriendKey> {

    @Query("SELECT f FROM UserFriend f WHERE f.user = ?1")
    List<UserFriend> getFriendsForUser(User user);

    Optional<UserFriend> findByUserAndFriend(User user, User friend);

    List<UserFriend> findAllByUser(User user);
}
