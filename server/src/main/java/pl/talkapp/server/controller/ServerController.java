package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.talkapp.server.dto.request.CreateServerRequest;
import pl.talkapp.server.dto.response.ServerResponse;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.ServerModel;
import pl.talkapp.server.service.server.ServerService;
import pl.talkapp.server.service.user.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/server")
public class ServerController {

    private final ServerService serverService;
    private final UserService userService;

    public ServerController(ServerService serverService, UserService userService) {
        this.serverService = serverService;
        this.userService = userService;
    }

    @PutMapping("")
    public ResponseEntity<ServerResponse> createServer(@Valid @RequestBody CreateServerRequest name) {
        User me = userService.getCurrentUser();
        Server server = serverService.createServer(me, name.getName());

        return new ResponseEntity<>(new ServerResponse(new ServerModel(server)), HttpStatus.OK);
    }
}
