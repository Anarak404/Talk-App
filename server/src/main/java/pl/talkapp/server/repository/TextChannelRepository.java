package pl.talkapp.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.entity.TextChannel;

@Repository
public interface TextChannelRepository extends CrudRepository<TextChannel, Long> {
}
