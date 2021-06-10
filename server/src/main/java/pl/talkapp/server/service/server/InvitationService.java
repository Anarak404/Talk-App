package pl.talkapp.server.service.server;

import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.User;

import java.util.Optional;

public interface InvitationService {
    Optional<Server> joinWithCode(User user, String code);

    String generateCode(Long serverId);
}
