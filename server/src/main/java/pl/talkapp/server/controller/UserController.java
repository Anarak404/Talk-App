package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.talkapp.server.dto.request.EmailRequest;
import pl.talkapp.server.dto.request.LoginRequest;
import pl.talkapp.server.dto.request.RegisterRequest;
import pl.talkapp.server.dto.response.AuthenticationResponse;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.dto.response.TokenResponse;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.ServerModel;
import pl.talkapp.server.model.UserModel;
import pl.talkapp.server.security.JwtTokenProvider;
import pl.talkapp.server.service.notification.NotificationService;
import pl.talkapp.server.service.server.ServerService;
import pl.talkapp.server.service.user.UserService;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider tokenProvider;
    private final ServerService serverService;
    private final NotificationService notificationService;

    public UserController(UserService userService, JwtTokenProvider tokenProvider,
                          ServerService serverService, NotificationService notificationService) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.serverService = serverService;
        this.notificationService = notificationService;
    }

    @PostMapping("")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest credentials) {

        try {
            User user = userService.register(credentials.getName(), credentials.getEmail(),
                    credentials.getPassword());
            notificationService.registerToken(user.getId(), credentials.getToken());

            return new ResponseEntity<>(
                    new AuthenticationResponse(tokenProvider.createToken(user.getId()),
                            tokenProvider.createRefreshToken(user.getId()),
                            new UserModel(user), Collections.emptyList(), Collections.emptyList()),
                    HttpStatus.OK);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with email already exist");
        }

    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginRequest credentials) {
        User user = userService.login(credentials.getEmail(), credentials.getPassword())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "Authentication failed"));
        notificationService.registerToken(user.getId(), credentials.getToken());

        return getResponse(user);
    }

    @GetMapping("")
    public ResponseEntity<AuthenticationResponse> userInformation() {
        User user = userService.getCurrentUser();

        return getResponse(user);
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<TokenResponse> refreshToken() {
        User user = userService.getCurrentUser();

        return new ResponseEntity<>(new TokenResponse(tokenProvider.createToken(user.getId()),
                tokenProvider.createRefreshToken(user.getId())), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<ResultResponse> logout(@RequestHeader("Authorization") String token) {
        userService.logout(token);
        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<UserModel> findUser(@Valid @RequestBody EmailRequest email) {
        User me = userService.getCurrentUser();
        User user = userService.findUserByEmail(me, email.getEmail());
        if (user != null) {
            return new ResponseEntity<>(new UserModel(user), HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with email do not exist!");
    }

    private ResponseEntity<AuthenticationResponse> getResponse(User user) {
        List<UserModel> history = userService.getHistory(user);

        List<ServerModel> servers = serverService.getServersForUser(user).stream()
                .map(ServerModel::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(
                new AuthenticationResponse(tokenProvider.createToken(user.getId()),
                        tokenProvider.createRefreshToken(user.getId()),
                        new UserModel(user), servers, history), HttpStatus.OK);
    }
}
