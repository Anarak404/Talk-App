package pl.talkapp.server.service.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.talkapp.server.model.User;
import pl.talkapp.server.repository.UserRepository;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(String name, String email, String password) {
        User user = new User(name, email, passwordEncoder.encode(password));
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
