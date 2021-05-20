package pl.talkapp.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.model.Status;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
}
