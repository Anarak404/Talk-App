package pl.talkapp.server.dto.response;

import lombok.Value;
import pl.talkapp.server.model.ServerModel;

@Value
public class ServerResponse {
    ServerModel server;
}
