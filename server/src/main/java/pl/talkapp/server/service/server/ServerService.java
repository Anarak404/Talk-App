package pl.talkapp.server.service.server;

import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.User;

import java.util.List;

public interface ServerService {
    Server createServer(User user, String name);

    boolean deleteServer(User user, Long id);

    boolean changeName(User user, Long id, String name);

    List<Server> getServersForUser(User user);

    Server getServer(Long id);
}
