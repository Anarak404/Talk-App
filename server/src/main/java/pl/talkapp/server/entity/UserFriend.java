package pl.talkapp.server.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "user_friend")
@Data
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserFriend {
    @EmbeddedId
    UserFriendKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @MapsId("friendId")
    @JoinColumn(name = "friend_id")
    User friend;

    @CreationTimestamp
    Timestamp date;

    public UserFriend(User user, User friend) {
        this.user = user;
        this.friend = friend;
        id = new UserFriendKey(user.getId(), friend.getId());
    }
}
