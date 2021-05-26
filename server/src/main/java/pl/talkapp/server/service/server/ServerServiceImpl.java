package pl.talkapp.server.service.server;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.TextChannel;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.exception.UnauthorizedAccessException;
import pl.talkapp.server.repository.ServerRepository;
import pl.talkapp.server.repository.TextChannelRepository;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ServerServiceImpl implements ServerService {

    private final ServerRepository serverRepository;
    private final TextChannelRepository textChannelRepository;

    public ServerServiceImpl(ServerRepository serverRepository,
                             TextChannelRepository textChannelRepository) {
        this.serverRepository = serverRepository;
        this.textChannelRepository = textChannelRepository;
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
    public TextChannel createTextChannel(Long id, User user, String name) {
        Server s = getServer(id);

        if (s.getOwner() == user) {
            TextChannel t = new TextChannel(name);
            t.setServer(s);
            textChannelRepository.save(t);
            return t;
        }

        throw new UnauthorizedAccessException("Unable to create text channel - you are not an " +
                "owner!");
    }

    private Server getServer(Long id) {
        Optional<Server> server = serverRepository.findById(id);

        return server.orElseThrow(() -> {
            throw new NoSuchElementException("Server does not exist!");
        });
    }
}
