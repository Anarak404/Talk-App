package pl.talkapp.server.service.user;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.entity.UserBlacklist;
import pl.talkapp.server.model.Blacklist;
import pl.talkapp.server.repository.UserBlacklistRepository;

import java.util.List;
import java.util.Optional;
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

    @Override
    public void setMuted(User user, User blacklistUser) {
        UserBlacklist u = getUserData(user, blacklistUser);

        u.setMuted(true);
        blacklistRepository.save(u);
    }

    @Override
    public void setBlocked(User user, User blacklistUser) {
        UserBlacklist u = getUserData(user, blacklistUser);

        u.setBlocked(true);
        blacklistRepository.save(u);
    }

    @Override
    public void setUnmuted(User user, User blacklistUser) {
        Optional<UserBlacklist> b = blacklistRepository.findByUserAndBlacklistUser(user,
                blacklistUser);

        b.ifPresent(u -> {
            if (!u.isBlocked()) {
                blacklistRepository.delete(u);
            } else {
                u.setMuted(false);
                blacklistRepository.save(u);
            }
        });
    }

    @Override
    public void setUnblocked(User user, User blacklistUser) {
        Optional<UserBlacklist> b = blacklistRepository.findByUserAndBlacklistUser(user,
                blacklistUser);

        b.ifPresent(u -> {
            if (!u.isMuted()) {
                blacklistRepository.delete(u);
            } else {
                u.setBlocked(false);
                blacklistRepository.save(u);
            }
        });
    }

    private UserBlacklist getUserData(User user, User blacklistUser) {
        Optional<UserBlacklist> blacklistData =
                blacklistRepository.findByUserAndBlacklistUser(user, blacklistUser);

        return blacklistData.orElseGet(() -> new UserBlacklist(user, blacklistUser));
    }
}
