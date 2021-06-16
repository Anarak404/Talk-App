package pl.talkapp.server.model;

import lombok.Value;
import pl.talkapp.server.entity.Server;

import java.sql.Timestamp;

@Value
public class ServerModel {
    Long id;

    String name;

    String photo;

    Timestamp creationDateTime;

    public ServerModel(Server server) {
        id = server.getId();
        name = server.getName();
        photo = server.getPhoto();
        creationDateTime = server.getCreationDateTime();
    }
}
