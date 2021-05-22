package pl.talkapp.server.service.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Status;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.repository.StatusRepository;
import pl.talkapp.server.repository.UserRepository;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    Map<pl.talkapp.server.model.Status, Status> statuses;

    public UserProfileServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                                  StatusRepository statusRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        statuses = statusRepository.findAll().stream().collect(Collectors.toMap(Status::getName,
                status -> status));
    }

    @Override
    public boolean changePassword(User user, String currentPassword, String newPassword) {
        if (passwordEncoder.matches(currentPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }

        return false;
    }

    @Override
    public void changeName(User user, String nick) {
        user.setName(nick);
        userRepository.save(user);
    }

    @Override
    public Status getOnline() {
        return statuses.get(pl.talkapp.server.model.Status.ONLINE);
    }

    @Override
    public Status getOffline() {
        return statuses.get(pl.talkapp.server.model.Status.OFFLINE);
    }

    @Override
    public Status getBusy() {
        return statuses.get(pl.talkapp.server.model.Status.BUSY);
    }

    @Override
    public void setStatus(User user, Status status) {
        user.setStatus(status);
        userRepository.save(user);
    }
}
