package pl.talkapp.server.service.message;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.PrivateMessage;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.ServerMessage;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.Message;
import pl.talkapp.server.model.UserModel;
import pl.talkapp.server.model.websocket.Response;
import pl.talkapp.server.repository.PrivateMessageRepository;
import pl.talkapp.server.repository.ServerMessageRepository;
import pl.talkapp.server.repository.ServerRepository;
import pl.talkapp.server.repository.UserRepository;

import java.util.Optional;

@Service
public class MessageServiceImpl implements MessageService {

    private final SimpMessagingTemplate template;
    private final UserRepository userRepository;
    private final PrivateMessageRepository privateMessageRepository;
    private final ServerMessageRepository serverMessageRepository;
    private final ServerRepository serverRepository;

    public MessageServiceImpl(SimpMessagingTemplate template, UserRepository userRepository,
                              PrivateMessageRepository privateMessageRepository,
                              ServerMessageRepository serverMessageRepository,
                              ServerRepository serverRepository) {
        this.template = template;
        this.userRepository = userRepository;
        this.privateMessageRepository = privateMessageRepository;
        this.serverMessageRepository = serverMessageRepository;
        this.serverRepository = serverRepository;
    }

    @Override
    public void sendServerMessage(Message message) {
        Optional<User> sender = userRepository.findById(message.getSenderId());
        Optional<Server> receiver = serverRepository.findById(message.getReceiverId());

        if (sender.isEmpty() || receiver.isEmpty()) {
            System.err.println("Invalid sender or server id!");
            return;
        }
        ServerMessage m = new ServerMessage();
        m.setContent(message.getContent());
        m.setServer(receiver.get());
        m.setSender(sender.get());

        ServerMessage serverMessage = serverMessageRepository.save(m);

        Response response = new Response(new UserModel(sender.get()), null, message.getContent(),
                serverMessage.getDateTime().toLocalDateTime(), serverMessage.getId());

        template.convertAndSend(String.format("/messages/%d", message.getReceiverId()),
                response);
    }

    @Override
    public void sendPrivateMessage(Message message) {
        Optional<User> sender = userRepository.findById(message.getSenderId());
        Optional<User> receiver = userRepository.findById(message.getReceiverId());

        if (sender.isEmpty() || receiver.isEmpty()) {
            System.err.println("Invalid sender or receiver id!");
            return;
        }
        PrivateMessage m = new PrivateMessage();
        m.setContent(message.getContent());
        m.setReceiver(receiver.get());
        m.setSender(sender.get());

        PrivateMessage privateMessage = privateMessageRepository.save(m);

        Response response = new Response(new UserModel(sender.get()),
                new UserModel(receiver.get()), message.getContent(),
                privateMessage.getDateTime().toLocalDateTime(), privateMessage.getId());

        template.convertAndSendToUser(message.getReceiverId().toString(), "/messages", response);
        template.convertAndSendToUser(message.getSenderId().toString(), "/messages", response);
    }
}
