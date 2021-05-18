package pl.talkapp.server.service.user;

import pl.talkapp.server.model.User;

public interface UserProfileService {
    boolean changePassword(User user, String currentPassword, String newPassword);
}
