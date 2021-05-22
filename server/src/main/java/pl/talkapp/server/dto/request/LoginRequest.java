package pl.talkapp.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.NotBlank;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class LoginRequest {

    @NotBlank
    String email;

    @NotBlank
    String password;

}
