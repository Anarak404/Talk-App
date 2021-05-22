package pl.talkapp.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import pl.talkapp.server.validation.Password;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank
    @Size(min = 3)
    String name;

    @Email
    String email;

    @Password
    String password;

}
