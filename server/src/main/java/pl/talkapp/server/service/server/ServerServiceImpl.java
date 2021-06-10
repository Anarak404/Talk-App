package pl.talkapp.server.service.server;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.ServerUser;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.repository.ServerRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

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
        Server s = getServer(id);

        if (s.getOwner() == user) {
            serverRepository.delete(s);
            return true;
        }

        return false;
    }

    @Override
    public boolean changeName(User user, Long id, String name) {
        Server s = getServer(id);

        if (s.getOwner() == user) {
            s.setName(name);
            serverRepository.save(s);
            return true;
        }

        return false;
    }

    @Override
    public List<Server> getServersForUser(User user) {
        return user.getServerUsers().stream().map(ServerUser::getServer).collect(Collectors.toList());
    }

    private Server getServer(Long id) {
        Optional<Server> server = serverRepository.findById(id);

        return server.orElseThrow(() -> {
            throw new NoSuchElementException("Server does not exist!");
        });
    }
}
