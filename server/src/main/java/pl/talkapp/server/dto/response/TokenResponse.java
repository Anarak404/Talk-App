package pl.talkapp.server.dto.response;

import lombok.Value;

@Value
public class TokenResponse {

    String token;

    String refreshToken;

}
