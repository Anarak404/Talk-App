package pl.talkapp.server.service.message;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.PrivateMessage;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.ServerMessage;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.Message;
import pl.talkapp.server.model.MessageModel;
import pl.talkapp.server.model.UserModel;
import pl.talkapp.server.model.websocket.Response;
import pl.talkapp.server.repository.PrivateMessageRepository;
import pl.talkapp.server.repository.ServerMessageRepository;
import pl.talkapp.server.repository.ServerRepository;
import pl.talkapp.server.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Override
    public List<MessageModel> getConversationWithUser(User me, User receiver) {
        Map<MessageModel, LocalDateTime> conversation = new HashMap<>();

        List<PrivateMessage> sentMessages =
                privateMessageRepository.findAllBySenderAndReceiver(me, receiver);
        List<PrivateMessage> receivedMessages =
                privateMessageRepository.findAllByReceiverAndSender(me, receiver);

        sentMessages.forEach(message -> conversation.put(new MessageModel(new UserModel(me),
                message.getContent(), message.getId()), message.getDateTime().toLocalDateTime()));

        receivedMessages.forEach(message -> conversation.put(new MessageModel(new UserModel(receiver),
                message.getContent(), message.getId()), message.getDateTime().toLocalDateTime()));

        return getMessageModels(conversation);
    }

    @Override
    public List<MessageModel> getServerConversation(Server server) {
        Map<MessageModel, LocalDateTime> conversation = new HashMap<>();
        List<ServerMessage> serverMessages = serverMessageRepository.findAllByServer(server);

        serverMessages.forEach(message -> conversation.put(new MessageModel(new UserModel(message.getSender()),
                message.getContent(), message.getId()), message.getDateTime().toLocalDateTime()));

        return getMessageModels(conversation);
    }

    private List<MessageModel> getMessageModels(Map<MessageModel, LocalDateTime> conversation) {
        List<Map.Entry<MessageModel, LocalDateTime>> sortedConversation =
                new ArrayList<>(conversation.entrySet());
        sortedConversation.sort((o1, o2) -> o2.getValue().compareTo(o1.getValue()));

        return sortedConversation.stream().map(Map.Entry::getKey).collect(Collectors.toList());
    }
}
