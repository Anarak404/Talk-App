package pl.talkapp.server.model.websocket;

import lombok.Value;
import pl.talkapp.server.entity.User;

@Value
public class Sender {

    Long id;
    String photo;
    String name;

    public Sender(User user) {
        id = user.getId();
        photo = user.getPhoto();
        name = user.getName();
    }

}
