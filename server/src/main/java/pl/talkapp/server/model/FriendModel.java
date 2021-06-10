package pl.talkapp.server.model;

import pl.talkapp.server.entity.UserFriend;

public class FriendModel {
    UserModel user;

    public FriendModel(UserFriend friend) {
        user = new UserModel(friend.getFriend());
    }
}
