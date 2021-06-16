package pl.talkapp.server.dto.request.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class SessionDescriptionPayload {

    @Min(1)
    @NotNull
    String peerId;

    Object sessionDescription;
}
