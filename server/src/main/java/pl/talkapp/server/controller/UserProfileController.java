package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.talkapp.server.dto.request.ChangePasswordRequest;
import pl.talkapp.server.dto.request.NameRequest;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.UserModel;
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
    public ResponseEntity<UserModel> changeName(@Valid @RequestBody NameRequest name) {
        User me = userService.getCurrentUser();
        User u = userProfileService.changeName(me, name.getName());

        return new ResponseEntity<>(new UserModel(u), HttpStatus.OK);
    }

    @PutMapping("/photo")
    public ResponseEntity<UserModel> changePhoto(@Valid @RequestBody NameRequest photo) {
        User me = userService.getCurrentUser();
        User u = userProfileService.changePhoto(me, photo.getName());

        return new ResponseEntity<>(new UserModel(u), HttpStatus.OK);
    }
}
