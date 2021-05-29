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
@Table(name = "server_user")
@Data
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServerUser {
    @EmbeddedId
    ServerUserKey id;

    @ManyToOne
    @MapsId("serverId")
    @JoinColumn(name = "server_id")
    Server server;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @CreationTimestamp
    Timestamp joinDateTime;

    @ManyToOne
    @JoinColumn(name = "role", nullable = false)
    Role role;

    public ServerUser(Server server, User user) {
        this.server = server;
        this.user = user;
        id = new ServerUserKey(server.getId(), user.getId());
    }
}
