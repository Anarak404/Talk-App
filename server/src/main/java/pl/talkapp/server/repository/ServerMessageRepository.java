package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.ServerMessage;

import java.util.List;

public interface ServerMessageRepository extends CrudRepository<ServerMessage, Long> {

    List<ServerMessage> findAllByServer(Server server);
}
