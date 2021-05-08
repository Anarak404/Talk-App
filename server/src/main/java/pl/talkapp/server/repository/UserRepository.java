package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}
