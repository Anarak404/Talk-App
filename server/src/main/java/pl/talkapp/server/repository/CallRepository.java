package pl.talkapp.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.entity.Call;
import pl.talkapp.server.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CallRepository extends CrudRepository<Call, Long> {

    @Query("SELECT c FROM Call c WHERE c.endDateTime IS NULL AND ((c.attender = ?1 AND c.caller =" +
            " ?2) OR (c.attender = ?2 AND c.caller = ?1))")
    Optional<Call> findOngoingCall(User user1, User user2);

    List<Call> findAllByCaller(User caller);

    List<Call> findAllByAttender(User attender);
}
