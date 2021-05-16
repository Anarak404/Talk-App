package pl.talkapp.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.talkapp.server.dto.request.CallRequest;
import pl.talkapp.server.dto.response.CallResponse;
import pl.talkapp.server.model.User;
import pl.talkapp.server.repository.UserRepository;
import pl.talkapp.server.service.call.CallService;

import javax.validation.Valid;

@RestController
@RequestMapping("/call")
public class CallController {

    private final CallService callService;
    private final UserRepository userRepository;

    public CallController(CallService callService, UserRepository userRepository) {
        this.callService = callService;
        this.userRepository = userRepository;
    }

    @PostMapping("/private/{id}/start")
    public ResponseEntity<CallResponse> startCall(@Valid CallRequest coordinates,
                                                  @PathVariable Long id) {
        Long userId = getUserId();
        User user = userRepository.findById(userId).orElseThrow();

        User attender = userRepository.findById(id).orElseThrow(() -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User does not exist");
        });

        Long callId;

        if (coordinates.getLocationX() != null && coordinates.getLocationY() != null) {
            callId = callService.startWithLocation(user, attender, coordinates.getLocationX(),
                    coordinates.getLocationY());
        } else {
            callId = callService.startWithoutLocation(user, attender);
        }

        return new ResponseEntity<>(new CallResponse(callId), HttpStatus.CREATED);
    }

    @PutMapping("/private/{id}/join")
    public ResponseEntity<CallResponse> joinCall(@Valid CallRequest coordinates,
                                                 @PathVariable Long id) {
        Long userId = getUserId();
        User user = userRepository.findById(userId).orElseThrow();

        User caller = userRepository.findById(id).orElseThrow(() -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User does not exist");
        });

        Long callId;

        if (coordinates.getLocationX() != null && coordinates.getLocationY() != null) {
            callId = callService.joinWithLocation(caller, user, coordinates.getLocationX(),
                    coordinates.getLocationY());
        } else {
            callId = callService.joinWithoutLocation(caller, user);
        }

        return new ResponseEntity<>(new CallResponse(callId), HttpStatus.OK);
    }

    private Long getUserId() {
        return (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
