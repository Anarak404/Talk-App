package pl.talkapp.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.entity.UserBlacklist;
import pl.talkapp.server.entity.UserBlacklistKey;

import java.util.List;

@Repository
public interface UserBlacklistRepository extends CrudRepository<UserBlacklist, UserBlacklistKey> {

    @Query("SELECT b FROM UserBlacklist b WHERE b.user = ?1")
    List<UserBlacklist> getBlacklistForUser(User user);
}
