package pl.talkapp.server.service.server;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.repository.ServerRepository;

import java.util.NoSuchElementException;
import java.util.Optional;

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

    @Override
    public boolean deleteServer(User user, Long id) {
        Optional<Server> server = serverRepository.findById(id);

        Server s = server.orElseThrow(() -> {
            throw new NoSuchElementException("Server does not exist!");
        });

        if (s.getOwner() == user) {
            serverRepository.delete(s);
            return true;
        }

        return false;
    }
}
