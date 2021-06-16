package pl.talkapp.server.dto.response;

import lombok.Value;
import pl.talkapp.server.model.ServerModel;
import pl.talkapp.server.model.UserModel;

import java.util.List;

@Value
public class AuthenticationResponse {

    String token;

    String refreshToken;

    UserModel user;

    List<ServerModel> servers;

    List<UserModel> friends;

}
