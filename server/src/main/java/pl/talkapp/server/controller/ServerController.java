package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.talkapp.server.dto.request.NameRequest;
import pl.talkapp.server.dto.request.TextChannelRequest;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.dto.response.ServerResponse;
import pl.talkapp.server.dto.response.TextChannelResponse;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.TextChannel;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.exception.UnauthorizedAccessException;
import pl.talkapp.server.model.ServerModel;
import pl.talkapp.server.model.TextChannelModel;
import pl.talkapp.server.service.server.ServerService;
import pl.talkapp.server.service.user.UserService;

import javax.validation.Valid;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/server")
public class ServerController {

    private final ServerService serverService;
    private final UserService userService;

    public ServerController(ServerService serverService, UserService userService) {
        this.serverService = serverService;
        this.userService = userService;
    }

    @PostMapping("")
    public ResponseEntity<ServerResponse> createServer(@Valid @RequestBody NameRequest name) {
        User me = userService.getCurrentUser();
        Server server = serverService.createServer(me, name.getName());

        return new ResponseEntity<>(new ServerResponse(new ServerModel(server)),
                HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResultResponse> deleteServer(@PathVariable Long id) {
        User me = userService.getCurrentUser();
        try {
            boolean result = serverService.deleteServer(me, id);
            if (result) {
                return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }

        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unable to delete server - you " +
                "are not an owner!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResultResponse> changeName(@Valid @RequestBody NameRequest name,
                                                     @PathVariable Long id) {
        User me = userService.getCurrentUser();
        try {
            boolean result = serverService.changeName(me, id, name.getName());
            if (result) {
                return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }

        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unable to change server name - " +
                "you are not an owner!");
    }

    @PostMapping("/channel")
    public ResponseEntity<TextChannelResponse> createTextChannel(@Valid @RequestBody TextChannelRequest data) {
        User me = userService.getCurrentUser();
        TextChannelResponse t;

        try {
            TextChannel textChannel = serverService.createTextChannel(data.getId(), me,
                    data.getName());
            t = new TextChannelResponse(new TextChannelModel(textChannel));

        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (UnauthorizedAccessException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }

        return new ResponseEntity<>(t, HttpStatus.CREATED);
    }
}
