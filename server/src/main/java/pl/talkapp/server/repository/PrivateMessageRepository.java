package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.talkapp.server.entity.PrivateMessage;

public interface PrivateMessageRepository extends CrudRepository<PrivateMessage, Long> {
}
