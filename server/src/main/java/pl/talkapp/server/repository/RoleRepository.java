package pl.talkapp.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.talkapp.server.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
