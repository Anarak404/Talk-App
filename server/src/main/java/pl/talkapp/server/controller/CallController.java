package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.talkapp.server.dto.request.CallRequest;
import pl.talkapp.server.dto.response.CallResponse;
import pl.talkapp.server.dto.response.ResultResponse;
import pl.talkapp.server.entity.Call;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.service.call.CallService;
import pl.talkapp.server.service.call.ConnectionService;
import pl.talkapp.server.service.user.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/call")
public class CallController {

    private final CallService callService;
    private final UserService userService;
    private final ConnectionService connectionService;

    public CallController(CallService callService, UserService userService,
                          ConnectionService connectionService) {
        this.callService = callService;
        this.userService = userService;
        this.connectionService = connectionService;
    }

    @PostMapping("/start/{id}")
    public ResponseEntity<CallResponse> startCall(@Valid @RequestBody CallRequest coordinates,
                                                  @PathVariable Long id) {
        User me = userService.getCurrentUser();
        User participant = userService.getUser(id).orElseThrow();
        Call call;

        if (coordinates.isNotEmpty()) {
            call = callService.startWithLocation(me, participant, coordinates.getLocationX(),
                coordinates.getLocationY());
        } else {
            call = callService.startWithoutLocation(me, participant);
        }

        callService.notifyUser(me, id, call.getId());

        return new ResponseEntity<>(new CallResponse(call.getId()), HttpStatus.CREATED);
    }

    @GetMapping("/end/{id}")
    public ResponseEntity<ResultResponse> rejectCall(@PathVariable Long id) {
        User me = userService.getCurrentUser();
        try {
            connectionService.rejectCall(me.getId(), id);
            return new ResponseEntity<>(new ResultResponse(true), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResultResponse(false),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
