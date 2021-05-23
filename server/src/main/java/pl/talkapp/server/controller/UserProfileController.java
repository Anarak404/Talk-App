package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.talkapp.server.dto.request.ChangePasswordRequest;
import pl.talkapp.server.dto.request.NameRequest;
import pl.talkapp.server.dto.request.StatusRequest;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.entity.Status;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.service.user.UserProfileService;
import pl.talkapp.server.service.user.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final UserService userService;

    public UserProfileController(UserProfileService userProfileService, UserService userService) {
        this.userProfileService = userProfileService;
        this.userService = userService;
    }

    @PutMapping("/password")
    public ResponseEntity<ResultResponse> changePassword(@Valid @RequestBody ChangePasswordRequest data) {
        User me = userService.getCurrentUser();

        boolean success = userProfileService.changePassword(me, data.getCurrentPassword(),
                data.getNewPassword());

        return new ResponseEntity<>(new ResultResponse(success), HttpStatus.OK);
    }

    @PutMapping("/nick")
    public ResponseEntity<ResultResponse> changeName(@Valid NameRequest name) {
        User me = userService.getCurrentUser();
        userProfileService.changeName(me, name.getName());

        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }

    @PutMapping("/status")
    public ResponseEntity<ResultResponse> changeStatus(@Valid @RequestBody StatusRequest status) {
        User me = userService.getCurrentUser();
        Status statusName = userProfileService.getOnline();

        switch (status.getStatus()) {
            case OFFLINE:
                statusName = userProfileService.getOffline();
                break;
            case BUSY:
                statusName = userProfileService.getBusy();
                break;
        }

        userProfileService.setStatus(me, statusName);

        return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
    }
}
