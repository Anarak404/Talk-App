package pl.talkapp.server.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

    @ToString.Exclude
    @OneToMany(mappedBy = "caller")
    List<Call> callers;

    @ToString.Exclude
    @OneToMany(mappedBy = "attender")
    List<Call> attenders;

    @ToString.Exclude
    @OneToMany(mappedBy = "sender")
    List<Message> messages;

    @ToString.Exclude
    @OneToMany(mappedBy = "receiver")
    List<PrivateMessage> receivedMessages;

    @ToString.Exclude
    @OneToMany(mappedBy = "user")
    List<UserFriend> friendList;

    @Getter(AccessLevel.NONE)
    @ToString.Exclude
    @OneToMany(mappedBy = "friend")
    List<UserFriend> userFriends;

    @ToString.Exclude
    @OneToMany(mappedBy = "owner")
    List<Server> servers;

    @ToString.Exclude
    @OneToMany(mappedBy = "user")
    List<ServerUser> serverUsers;

}

