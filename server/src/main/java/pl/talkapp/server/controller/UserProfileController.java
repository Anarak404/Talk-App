package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.talkapp.server.dto.request.ChangePasswordRequest;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.model.User;
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
    public ResponseEntity<ResultResponse> changePassword(@Valid ChangePasswordRequest data) {
        User me = userService.getCurrentUser();

        boolean success = userProfileService.changePassword(me, data.getCurrentPassword(),
                data.getNewPassword());

        return new ResponseEntity<>(new ResultResponse(success), HttpStatus.OK);
    }
}
