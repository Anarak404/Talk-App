package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.talkapp.server.dto.request.IdRequest;
import pl.talkapp.server.dto.response.FriendListResponse;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.entity.UserFriend;
import pl.talkapp.server.model.MessageModel;
import pl.talkapp.server.model.PushNotification;
import pl.talkapp.server.service.message.MessageService;
import pl.talkapp.server.service.notification.NotificationService;
import pl.talkapp.server.service.user.UserFriendsService;
import pl.talkapp.server.service.user.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user/friends")
public class UserFriendController {

    private final UserService userService;
    private final UserFriendsService friendsService;
    private final MessageService messageService;
    private final NotificationService notificationService;

    public UserFriendController(UserService userService, UserFriendsService friendsService,
                                MessageService messageService,
                                NotificationService notificationService) {
        this.userService = userService;
        this.friendsService = friendsService;
        this.messageService = messageService;
        this.notificationService = notificationService;
    }

    @GetMapping("")
    public ResponseEntity<FriendListResponse> getFriends() {
        User me = userService.getCurrentUser();
        List<UserFriend> friends = friendsService.getFriends(me);

        return new ResponseEntity<>(new FriendListResponse(friends), HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<ResultResponse> addFriend(@Valid @RequestBody IdRequest friend) {
        User me = userService.getCurrentUser();
        User f = userService.getUser(friend.getId()).orElseThrow();
        boolean result;
        try {
            friendsService.addFriend(me, f);
            notificationService.sendNotificationToUser(new PushNotification(f.getName() + " added" +
                    " you to friends!", "New friend", "FRIEND", me.getName()), friend.getId());
            result = true;
        } catch (Exception e) {
            result = false;
        }
        return new ResponseEntity<>(new ResultResponse(result), HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<ResultResponse> deleteFriend(@Valid @RequestBody IdRequest friend) {
        User me = userService.getCurrentUser();
        User f = userService.getUser(friend.getId()).orElseThrow();
        friendsService.deleteFriend(me, f);

        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<MessageModel>> getPrivateConversation(@PathVariable Long id) {
        User me = userService.getCurrentUser();
        Optional<User> f = userService.getUser(id);

        if (f.isPresent()) {
            List<MessageModel> conversation = messageService.getConversationWithUser(me, f.get());
            return new ResponseEntity<>(conversation, HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist!");
    }
}
