package pl.talkapp.server.service.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Call;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.entity.UserFriend;
import pl.talkapp.server.model.UserModel;
import pl.talkapp.server.repository.CallRepository;
import pl.talkapp.server.repository.UserFriendRepository;
import pl.talkapp.server.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CallRepository callRepository;
    private final UserFriendRepository friendRepository;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           CallRepository callRepository, UserFriendRepository friendRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.callRepository = callRepository;
        this.friendRepository = friendRepository;
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

    @Override
    public User findUserByEmail(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.orElse(null);
    }

    @Override
    public List<UserModel> getHistory(User user) {
        Map<UserModel, LocalDateTime> history = new HashMap<>();

        List<UserFriend> f = friendRepository.findAllByUser(user);
        List<Call> c1 = callRepository.findAllByCaller(user);
        List<Call> c2 = callRepository.findAllByAttender(user);

        f.forEach(friend -> history.put(new UserModel(friend.getFriend()),
                friend.getDate().toLocalDateTime()));

        c1.forEach(call -> {
            UserModel u = new UserModel(call.getAttender());
            LocalDateTime date = call.getEndDateTime().toLocalDateTime();
            updateHistory(history, u, date);
        });

        c2.forEach(call -> {
            UserModel u = new UserModel(call.getCaller());
            LocalDateTime date = call.getEndDateTime().toLocalDateTime();
            updateHistory(history, u, date);
        });

        List<Map.Entry<UserModel, LocalDateTime>> sortedHistory =
                new ArrayList<>(history.entrySet());
        sortedHistory.sort((o1, o2) -> o2.getValue().compareTo(o1.getValue()));

        return sortedHistory.stream().map(Map.Entry::getKey).collect(Collectors.toList());
    }

    private void updateHistory(Map<UserModel, LocalDateTime> history, UserModel u,
                               LocalDateTime date) {
        if (history.containsKey(u)) {
            if (history.get(u).isBefore(date)) {
                history.put(u, date);
            }
        } else {
            history.put(u, date);
        }
    }
}
