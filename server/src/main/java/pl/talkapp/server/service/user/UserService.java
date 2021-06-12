package pl.talkapp.server.service.user;

import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.UserModel;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User register(String name, String email, String password);

    Optional<User> login(String email, String password);

    Long getCurrentUserId();

    User getCurrentUser();

    Optional<User> getUser(Long id);

    User findUserByEmail(String email);

    List<UserModel> getHistory(User user);
}
