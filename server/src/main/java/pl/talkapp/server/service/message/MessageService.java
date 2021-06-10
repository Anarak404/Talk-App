package pl.talkapp.server.service.message;

import pl.talkapp.server.model.Message;

public interface MessageService {

    void sendServerMessage(Message message);
    void sendPrivateMessage(Message message);

}
