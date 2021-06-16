package pl.talkapp.server.dto.response;

import lombok.Value;
import pl.talkapp.server.model.UserModel;

@Value
public class UserInfoResponse {

    UserModel user;
}
