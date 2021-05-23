package pl.talkapp.server.service.server;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.repository.ServerRepository;

@Service
public class ServerServiceImpl implements ServerService {

    private final ServerRepository serverRepository;

    public ServerServiceImpl(ServerRepository serverRepository) {
        this.serverRepository = serverRepository;
    }

    @Override
    public Server createServer(User user, String name) {
        Server server = new Server(name);
        server.setOwner(user);
        serverRepository.save(server);

        return server;
    }
}
