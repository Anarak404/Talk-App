package pl.talkapp.server.dto.response;

import lombok.Value;
import pl.talkapp.server.model.TextChannelModel;

@Value
public class TextChannelResponse {
    TextChannelModel channel;
}
