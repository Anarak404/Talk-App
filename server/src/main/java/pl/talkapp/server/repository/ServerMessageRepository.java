package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.talkapp.server.entity.ServerMessage;

public interface ServerMessageRepository extends CrudRepository<ServerMessage, Long> {
}
