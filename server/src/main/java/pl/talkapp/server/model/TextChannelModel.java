package pl.talkapp.server.model;

import lombok.Value;
import pl.talkapp.server.entity.TextChannel;

@Value
public class TextChannelModel {
    Long id;

    String name;

    public TextChannelModel(TextChannel textChannel) {
        id = textChannel.getId();
        name = textChannel.getName();
    }
}
