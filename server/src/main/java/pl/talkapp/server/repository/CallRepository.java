package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.model.Call;

@Repository
public interface CallRepository extends CrudRepository<Call, Long> {
}
