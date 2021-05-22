package pl.talkapp.server.dto.response;

import lombok.Value;
import pl.talkapp.server.entity.User;

import java.util.List;

@Value
public class FriendListResponse {

    List<User> friends;

}
