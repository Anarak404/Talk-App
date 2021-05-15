package pl.talkapp.server.model;

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
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "call")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Call {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @CreationTimestamp
    @Column(nullable = false)
    @NonNull
    Timestamp startDateTime;

    Timestamp endDateTime;

    @Column(nullable = false)
    @NonNull
    Double callerX;

    @Column(nullable = false)
    @NonNull
    Double callerY;

    @Column(nullable = false)
    @NonNull
    Double attenderX;

    @Column(nullable = false)
    @NonNull
    Double attenderY;

    @ManyToOne
    @JoinColumn(name="caller")
    User caller;

    @ManyToOne
    @JoinColumn(name = "attender")
    private User attender;
}
