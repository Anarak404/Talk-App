package pl.talkapp.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import pl.talkapp.server.validation.Password;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangePasswordRequest {

    @Password
    String currentPassword;

    @Password
    String newPassword;

}
