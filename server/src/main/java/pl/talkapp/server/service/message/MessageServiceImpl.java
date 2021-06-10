package pl.talkapp.server.service.message;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.Message;
import pl.talkapp.server.model.UserModel;
import pl.talkapp.server.model.websocket.Response;
import pl.talkapp.server.repository.UserRepository;

import java.time.LocalDateTime;

@Service
public class MessageServiceImpl implements MessageService {

    private final SimpMessagingTemplate template;
    private final UserRepository userRepository;

    public MessageServiceImpl(SimpMessagingTemplate template, UserRepository userRepository) {
        this.template = template;
        this.userRepository = userRepository;
    }

    @Override
    public void sendServerMessage(Message message) {
        User sender = userRepository.findById(message.getSenderId())
            .orElseThrow(() -> new IllegalStateException("Invalid sender id!"));

        // TODO:  save messages to db
        Response response = new Response(new UserModel(sender), message.getContent(),
            LocalDateTime.now());

        template.convertAndSend(String.format("/messages/%d", message.getReceiverId()),
            response);
    }

    @Override
    public void sendPrivateMessage(Message message) {
        User sender = userRepository.findById(message.getSenderId())
            .orElseThrow(() -> new IllegalStateException("Invalid sender id!"));

        // TODO: save messages to db
        Response response = new Response(new UserModel(sender), message.getContent(),
            LocalDateTime.now());

        template.convertAndSendToUser(message.getReceiverId().toString(), "/messages", response);
        template.convertAndSendToUser(message.getSenderId().toString(), "/messages", response);
    }
}
