package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.entity.Server;

@Repository
public interface ServerRepository extends CrudRepository<Server, Long> {
}
