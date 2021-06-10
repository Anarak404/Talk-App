package pl.talkapp.server.service.user;

import pl.talkapp.server.entity.User;

public interface UserProfileService {
    boolean changePassword(User user, String currentPassword, String newPassword);

    void changeName(User user, String nick);
}
