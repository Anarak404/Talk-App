package pl.talkapp.server.service.user;

import pl.talkapp.server.entity.User;

public interface UserProfileService {
    boolean changePassword(User user, String currentPassword, String newPassword);

    User changeName(User user, String nick);

    User changePhoto(User user, String photo);
}
