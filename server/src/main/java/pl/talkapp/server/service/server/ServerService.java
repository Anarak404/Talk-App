package pl.talkapp.server.service.server;

import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.TextChannel;
import pl.talkapp.server.entity.User;

public interface ServerService {
    Server createServer(User user, String name);

    boolean deleteServer(User user, Long id);

    boolean changeName(User user, Long id, String name);

    TextChannel createTextChannel(Long id, User user, String name);
}
