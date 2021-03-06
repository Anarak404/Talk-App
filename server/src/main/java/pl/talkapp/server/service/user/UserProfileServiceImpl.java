package pl.talkapp.server.service.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.repository.UserRepository;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserProfileServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
    public User changeName(User user, String nick) {
        user.setName(nick);
        userRepository.save(user);
        return user;
    }

    @Override
    public User changePhoto(User user, String photo) {
        user.setPhoto(photo);
        userRepository.save(user);
        return user;
    }
}
