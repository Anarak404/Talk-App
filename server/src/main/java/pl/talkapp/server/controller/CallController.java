package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.talkapp.server.dto.request.CallRequest;
import pl.talkapp.server.dto.response.CallResponse;
import pl.talkapp.server.dto.response.EndCallResponse;
import pl.talkapp.server.entity.Call;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.service.call.CallService;
import pl.talkapp.server.service.user.UserService;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/call")
public class CallController {

    private final CallService callService;
    private final UserService userService;

    public CallController(CallService callService, UserService userService) {
        this.callService = callService;
        this.userService = userService;
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

    @PutMapping("/private/{id}/join")
    public ResponseEntity<CallResponse> joinCall(@Valid @RequestBody CallRequest coordinates,
                                                 @PathVariable Long id) {
        User me = userService.getCurrentUser();
        User participant = userService.getUser(id).orElseThrow();

        Optional<Call> ongoingCall = callService.getOngoingCall(me, participant);

        if (ongoingCall.isPresent()) {
            Call call = ongoingCall.get();

            if (coordinates.isNotEmpty()) {
                callService.joinWithLocation(call, me, coordinates.getLocationX(),
                    coordinates.getLocationY());
            } else {
                callService.joinWithoutLocation(call, me);
            }

            return new ResponseEntity<>(new CallResponse(call.getId()), HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to join the call!");
    }

    @GetMapping("/private/{id}/end")
    public ResponseEntity<EndCallResponse> endCall(@PathVariable Long id) {
        User me = userService.getCurrentUser();
        User participant = userService.getUser(id).orElseThrow();

        Optional<Call> ongoingCall = callService.getOngoingCall(me, participant);

        if (ongoingCall.isPresent()) {
            Call call = ongoingCall.get();
            Long duration = callService.endCall(call);
            return new ResponseEntity<>(new EndCallResponse(duration), HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid operation!");
    }

}
