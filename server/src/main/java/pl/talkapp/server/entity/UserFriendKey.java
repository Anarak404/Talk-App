package pl.talkapp.server.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserFriendKey implements Serializable {
    @Column(name = "user_id")
    Long userId;

    @Column(name = "friend_id")
    Long friendId;
}
