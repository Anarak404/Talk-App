package pl.talkapp.server.dto.response;

import lombok.Value;
import pl.talkapp.server.entity.UserFriend;
import pl.talkapp.server.model.UserModel;

import java.util.List;
import java.util.stream.Collectors;

@Value
public class FriendListResponse {

    List<UserModel> friends;

    public FriendListResponse(List<UserFriend> users) {
        friends = users.stream()
                .map(u -> new UserModel(u.getFriend()))
                .collect(Collectors.toList());
    }
}
