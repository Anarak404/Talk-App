package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.ServerUser;
import pl.talkapp.server.entity.ServerUserKey;

import java.util.List;

public interface ServerUserRepository extends CrudRepository<ServerUser, ServerUserKey> {

    List<ServerUser> findAllByServer(Server server);
}
