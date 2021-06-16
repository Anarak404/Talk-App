package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.talkapp.server.dto.request.CodeRequest;
import pl.talkapp.server.dto.request.NameRequest;
import pl.talkapp.server.dto.request.ServerRequest;
import pl.talkapp.server.dto.response.CodeResponse;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.dto.response.ServerResponse;
import pl.talkapp.server.entity.Server;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.MessageModel;
import pl.talkapp.server.model.PushNotification;
import pl.talkapp.server.model.ServerModel;
import pl.talkapp.server.model.UserModel;
import pl.talkapp.server.service.message.MessageService;
import pl.talkapp.server.service.notification.NotificationService;
import pl.talkapp.server.service.server.InvitationService;
import pl.talkapp.server.service.server.ServerService;
import pl.talkapp.server.service.user.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/server")
public class ServerController {

    private final ServerService serverService;
    private final UserService userService;
    private final InvitationService invitationService;
    private final MessageService messageService;
    private final NotificationService notificationService;

    public ServerController(ServerService serverService, UserService userService,
                            InvitationService invitationService, MessageService messageService,
                            NotificationService notificationService) {
        this.serverService = serverService;
        this.userService = userService;
        this.invitationService = invitationService;
        this.messageService = messageService;
        this.notificationService = notificationService;
    }

    @PostMapping("")
    public ResponseEntity<ServerResponse> createServer(@Valid @RequestBody ServerRequest name) {
        User me = userService.getCurrentUser();
        Server server = serverService.createServer(me, name.getName(), name.getPhoto());

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

    @GetMapping("/{id}/code")
    public ResponseEntity<CodeResponse> generateCode(@PathVariable Long id) {
        return new ResponseEntity<>(new CodeResponse(invitationService.generateCode(id)),
                HttpStatus.CREATED);
    }

    @PostMapping("/code")
    public ResponseEntity<ServerResponse> joinServer(@Valid @RequestBody CodeRequest code) {
        User me = userService.getCurrentUser();
        Optional<Server> s = invitationService.joinWithCode(me, code.getName());

        if (s.isPresent()) {
            Set<Long> membersId =
                    serverService.getServerMembers(s.get()).stream().map(User::getId).collect(Collectors.toSet());
            membersId.remove(me.getId());
            notificationService.sendNotificationToUsers(new PushNotification("User " +
                    me.getName() + " has joined the server " + s.get().getName(), "New server " +
                    "member", "SERVER", me.getName()), membersId);

            return new ResponseEntity<>(new ServerResponse(new ServerModel(s.get())),
                    HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid code!");
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<MessageModel>> getServerConversation(@PathVariable Long id) {
        try {
            Server server = serverService.getServer(id);
            List<MessageModel> conversation = messageService.getServerConversation(server);
            return new ResponseEntity<>(conversation, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<List<UserModel>> getServerMembers(@PathVariable Long id) {
        try {
            Server server = serverService.getServer(id);
            List<User> users = serverService.getServerMembers(server);
            return new ResponseEntity<>(users.stream().map(UserModel::new).collect(Collectors.toList()), HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
