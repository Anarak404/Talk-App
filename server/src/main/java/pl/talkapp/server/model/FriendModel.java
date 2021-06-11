package pl.talkapp.server.model;

import lombok.Value;
import pl.talkapp.server.entity.UserFriend;

@Value
public class FriendModel {
    UserModel user;

    public FriendModel(UserFriend friend) {
        user = new UserModel(friend.getFriend());
    }
}
