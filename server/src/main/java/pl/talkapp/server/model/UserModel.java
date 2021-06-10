package pl.talkapp.server.model;

import lombok.Value;
import pl.talkapp.server.entity.User;

@Value
public class UserModel {
    Long id;

    String name;

    String photo;

    public UserModel(User user) {
        id = user.getId();
        name = user.getName();
        photo = user.getPhoto();
    }
}
