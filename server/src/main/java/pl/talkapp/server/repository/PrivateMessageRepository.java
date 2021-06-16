package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.talkapp.server.entity.PrivateMessage;
import pl.talkapp.server.entity.User;

import java.util.List;

public interface PrivateMessageRepository extends CrudRepository<PrivateMessage, Long> {

    List<PrivateMessage> findAllByReceiverAndSender(User receiver, User sender);

    List<PrivateMessage> findAllBySenderAndReceiver(User sender, User receiver);
}
