package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.model.Call;
import pl.talkapp.server.model.User;

import java.util.Optional;

@Repository
public interface CallRepository extends CrudRepository<Call, Long> {
    Optional<Call> findCallByCallerAndAttenderAndEndDateTimeIsNull(User caller, User attender);
}
