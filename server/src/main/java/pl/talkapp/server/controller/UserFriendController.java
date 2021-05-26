package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.talkapp.server.dto.request.IdRequest;
import pl.talkapp.server.dto.response.FriendListResponse;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.entity.UserFriend;
import pl.talkapp.server.service.user.UserFriendsService;
import pl.talkapp.server.service.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/user/friends")
public class UserFriendController {

    private final UserService userService;
    private final UserFriendsService friendsService;

    public UserFriendController(UserService userService, UserFriendsService friendsService) {
        this.userService = userService;
        this.friendsService = friendsService;
    }

    @GetMapping("")
    public ResponseEntity<FriendListResponse> getFriends() {
        User me = userService.getCurrentUser();
        List<UserFriend> friends = friendsService.getFriends(me);

        return new ResponseEntity<>(new FriendListResponse(friends), HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<ResultResponse> addFriend(@RequestBody IdRequest friend) {
        User me = userService.getCurrentUser();
        User f = userService.getUser(friend.getId()).orElseThrow();
        friendsService.addFriend(me, f);

        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<ResultResponse> deleteFriend(@RequestBody IdRequest friend) {
        User me = userService.getCurrentUser();
        User f = userService.getUser(friend.getId()).orElseThrow();
        friendsService.deleteFriend(me, f);

        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }
}
