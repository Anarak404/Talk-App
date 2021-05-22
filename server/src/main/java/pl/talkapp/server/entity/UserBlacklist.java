package pl.talkapp.server.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
@AllArgsConstructor
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
}
