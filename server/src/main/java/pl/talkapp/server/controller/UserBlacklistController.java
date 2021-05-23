package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.talkapp.server.dto.request.BlacklistRequest;
import pl.talkapp.server.dto.response.BlacklistResponse;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.Blacklist;
import pl.talkapp.server.service.user.UserBlacklistService;
import pl.talkapp.server.service.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/user/blacklist")
public class UserBlacklistController {

    private final UserService userService;
    private final UserBlacklistService blacklistService;


    public UserBlacklistController(UserService userService, UserBlacklistService blacklistService) {
        this.userService = userService;
        this.blacklistService = blacklistService;
    }

    @GetMapping("")
    public ResponseEntity<BlacklistResponse> getBlacklist() {
        User me = userService.getCurrentUser();
        List<Blacklist> blacklist = blacklistService.getBlacklistUsers(me);

        return new ResponseEntity<>(new BlacklistResponse(blacklist), HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<ResultResponse> addToBlacklist(@RequestBody BlacklistRequest data) {
        User me = userService.getCurrentUser();
        User participant = userService.getUser(data.getId()).orElseThrow();

        switch (data.getAction()) {
            case MUTE:
                blacklistService.setMuted(me, participant);
                break;
            case BLOCK:
                blacklistService.setBlocked(me, participant);
                break;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Supported actions: " +
                        "MUTE, BLOCK!");
        }

        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<ResultResponse> deleteFromBlacklist(@RequestBody BlacklistRequest data) {
        User me = userService.getCurrentUser();
        User participant = userService.getUser(data.getId()).orElseThrow();

        switch (data.getAction()) {
            case UNMUTE:
                blacklistService.setUnmuted(me, participant);
                break;
            case UNBLOCK:
                blacklistService.setUnblocked(me, participant);
                break;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Supported actions: " +
                        "UNMUTE, UNBLOCK!");
        }

        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }
}
