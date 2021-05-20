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
public class UserBlacklistKey implements Serializable {
    @Column(name = "user_id")
    Long userId;

    @Column(name = "blacklistUser_id")
    Long blacklistUserId;
}
