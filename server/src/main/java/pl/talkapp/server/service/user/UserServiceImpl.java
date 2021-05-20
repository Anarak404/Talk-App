package pl.talkapp.server.service.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Status;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.repository.StatusRepository;
import pl.talkapp.server.repository.UserRepository;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StatusRepository statusRepository;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           StatusRepository statusRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.statusRepository = statusRepository;
    }

    @Override
    public User register(String name, String email, String password) {
        User user = new User(name, email, passwordEncoder.encode(password));
        Status status = statusRepository.getOne(1L);
        user.setStatus(status);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.map(u -> {
            if (!passwordEncoder.matches(password, u.getPassword())) {
                u = null;
            }
            return u;
        });
    }

    @Override
    public Long getCurrentUserId() {
        return (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Override
    public User getCurrentUser() {
        return getUser(getCurrentUserId()).orElseThrow(() -> new RuntimeException("User not " +
                "logged in!"));
    }

    @Override
    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }
}
