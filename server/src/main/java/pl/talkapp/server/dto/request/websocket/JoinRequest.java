package pl.talkapp.server.dto.request.websocket;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JoinRequest {

    @Min(1)
    @NotNull
    Long channelId;

    boolean privateCall;
}
