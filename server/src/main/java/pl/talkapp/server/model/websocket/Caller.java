package pl.talkapp.server.model.websocket;

import lombok.Value;
import pl.talkapp.server.entity.User;

@Value
public class Caller {

    Long id;
    String name;
    String photo;

    public Caller(User user) {
        id = user.getId();
        name = user.getName();
        photo = user.getPhoto();
    }

}
