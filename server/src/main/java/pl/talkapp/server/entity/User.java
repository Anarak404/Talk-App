package pl.talkapp.server.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "app_user")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    @NonNull
    String name;

    @Column(nullable = false, unique = true)
    @NonNull
    String email;

    @Column(nullable = false)
    @NonNull
    String password;

    String photo;

    @CreationTimestamp
    LocalDateTime creationDateTime;

    @OneToMany(mappedBy = "caller")
    List<Call> callers;

    @OneToMany(mappedBy = "attender")
    List<Call> attenders;

    @OneToMany(mappedBy = "user")
    List<UserBlacklist> users;

    @OneToMany(mappedBy = "blacklistUser")
    List<UserBlacklist> blacklistUsers;

    @OneToMany(mappedBy = "sender")
    List<Message> messages;

    @OneToMany(mappedBy = "receiver")
    List<PrivateMessage> receivedMessages;

    @OneToMany(mappedBy = "user")
    List<UserFriend> friendList;

    @OneToMany(mappedBy = "friend")
    List<UserFriend> userFriends;

    @OneToMany(mappedBy = "owner")
    List<Server> servers;

    @OneToMany(mappedBy = "user")
    List<ServerUser> serverUsers;

    @ManyToOne
    @JoinColumn(name = "status", nullable = false)
    Status status;

}

