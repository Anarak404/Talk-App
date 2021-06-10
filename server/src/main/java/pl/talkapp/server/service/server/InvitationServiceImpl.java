package pl.talkapp.server.service.server;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.ServerUser;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.repository.ServerRepository;
import pl.talkapp.server.repository.ServerUserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class InvitationServiceImpl implements InvitationService {

    private final Map<String, Long> codes;
    private final ServerUserRepository serverUserRepository;
    private final ServerRepository serverRepository;
    private static final int CODE_LENGTH = 8;

    public InvitationServiceImpl(ServerUserRepository serverUserRepository,
                                 ServerRepository serverRepository) {
        this.serverUserRepository = serverUserRepository;
        this.serverRepository = serverRepository;
        codes = new HashMap<>();
    }

    @Override
    public Optional<Server> joinWithCode(User user, String code) {
        Long serverId = codes.get(code);

        if (serverId != null) {
            Optional<Server> s = serverRepository.findById(serverId);
            if (s.isPresent()) {
                ServerUser u = new ServerUser(s.get(), user);
                serverUserRepository.save(u);
            }
            return s;
        }

        return Optional.empty();
    }

    @Override
    public String generateCode(Long serverId) {
        String uuid = UUID.randomUUID().toString().substring(CODE_LENGTH);

        Optional<String> key = codes.entrySet().stream()
                .filter(x -> x.getValue().equals(serverId))
                .map(Map.Entry::getKey)
                .findFirst();

        key.ifPresent(codes::remove);
        codes.put(uuid, serverId);

        return uuid;
    }
}
