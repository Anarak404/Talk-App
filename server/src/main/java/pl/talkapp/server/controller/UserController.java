package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.talkapp.server.dto.request.LoginRequest;
import pl.talkapp.server.dto.request.RegisterRequest;
import pl.talkapp.server.dto.response.AuthenticationResponse;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.FriendModel;
import pl.talkapp.server.model.ServerModel;
import pl.talkapp.server.model.UserModel;
import pl.talkapp.server.security.JwtTokenProvider;
import pl.talkapp.server.service.server.ServerService;
import pl.talkapp.server.service.user.UserFriendsService;
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
    private final UserFriendsService friendsService;

    public UserController(UserService userService, JwtTokenProvider tokenProvider,
                          ServerService serverService, UserFriendsService friendsService) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.serverService = serverService;
        this.friendsService = friendsService;
    }

    @PostMapping("")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest credentials) {

        try {
            User user = userService.register(credentials.getName(), credentials.getEmail(),
                    credentials.getPassword());

            return new ResponseEntity<>(
                    new AuthenticationResponse(tokenProvider.createToken(user.getId()),
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

        List<FriendModel> friends = friendsService.getFriends(user).stream()
                .map(FriendModel::new)
                .collect(Collectors.toList());

        List<ServerModel> servers = serverService.getServersForUser(user).stream()
                .map(ServerModel::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(
                new AuthenticationResponse(tokenProvider.createToken(user.getId()),
                        new UserModel(user), servers, friends), HttpStatus.OK);
    }

}
