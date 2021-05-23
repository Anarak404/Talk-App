package pl.talkapp.server.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "user_blacklist")
@Data
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserBlacklist {
    @EmbeddedId
    UserBlacklistKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @MapsId("blacklistUserId")
    @JoinColumn(name = "blacklistUser_id")
    User blacklistUser;

    @Column(columnDefinition = "boolean default false")
    boolean muted;

    @Column(columnDefinition = "boolean default false")
    boolean blocked;

    public UserBlacklist(User user, User blacklistUser) {
        this.user = user;
        this.blacklistUser = blacklistUser;
        id = new UserBlacklistKey(user.getId(), blacklistUser.getId());
    }
}
