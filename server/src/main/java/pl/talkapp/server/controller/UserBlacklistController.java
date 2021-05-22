package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity<ResultResponse> addToBlacklist(BlacklistRequest data) {
        User me = userService.getCurrentUser();

        switch (data.getAction()) {
            case MUTE:
                blacklistService.setMuted(me, data.getUser());
                break;
            case BLOCK:
                blacklistService.setBlocked(me, data.getUser());
        }

        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }
}
