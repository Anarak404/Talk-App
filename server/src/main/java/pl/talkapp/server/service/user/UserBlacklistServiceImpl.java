package pl.talkapp.server.service.user;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.entity.UserBlacklist;
import pl.talkapp.server.model.Blacklist;
import pl.talkapp.server.repository.UserBlacklistRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserBlacklistServiceImpl implements UserBlacklistService {

    private final UserBlacklistRepository blacklistRepository;

    public UserBlacklistServiceImpl(UserBlacklistRepository blacklistRepository) {
        this.blacklistRepository = blacklistRepository;
    }

    @Override
    public List<Blacklist> getBlacklistUsers(User user) {
        return blacklistRepository.getBlacklistForUser(user).stream()
                .map(u -> new Blacklist(u.getBlacklistUser(), u.isMuted(), u.isBlocked()))
                .collect(Collectors.toList());
    }
}
