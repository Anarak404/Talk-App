package pl.talkapp.server.dto.request.websocket;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class ICECandidatePayload {

    @Min(1)
    @NotNull
    String peerId;

    Object iceCandidate;
}
