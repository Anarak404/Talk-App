package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.talkapp.server.dto.request.LoginRequest;
import pl.talkapp.server.dto.request.RegisterRequest;
import pl.talkapp.server.dto.response.AuthenticationResponse;
import pl.talkapp.server.model.User;
import pl.talkapp.server.security.JwtTokenProvider;
import pl.talkapp.server.service.user.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider tokenProvider;

    public UserController(UserService userService, JwtTokenProvider tokenProvider) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/")
    public ResponseEntity<AuthenticationResponse> register(RegisterRequest credentials) {

        try {
            User user = userService.register(credentials.getName(), credentials.getEmail(),
                    credentials.getPassword());

            return new ResponseEntity<>(
                    new AuthenticationResponse(tokenProvider.createToken(user.getId())),
                    HttpStatus.OK);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with email already exist");
        }

    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(LoginRequest credentials) {
        Optional<User> user = userService.login(credentials.getEmail(), credentials.getPassword());

        if (user.isPresent()) {
            return new ResponseEntity<>(
                    new AuthenticationResponse(tokenProvider.createToken(user.get().getId())),
                    HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication failed");
    }

}
