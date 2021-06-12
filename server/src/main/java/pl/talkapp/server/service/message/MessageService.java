package pl.talkapp.server.service.message;

import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.Message;
import pl.talkapp.server.model.MessageModel;

import java.util.List;

public interface MessageService {

    void sendServerMessage(Message message);

    void sendPrivateMessage(Message message);

    List<MessageModel> getConversationWithUser(User me, User receiver);

}
