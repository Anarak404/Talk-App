package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.talkapp.server.entity.ServerUser;
import pl.talkapp.server.entity.ServerUserKey;

public interface ServerUserRepository extends CrudRepository<ServerUser, ServerUserKey> {
}
