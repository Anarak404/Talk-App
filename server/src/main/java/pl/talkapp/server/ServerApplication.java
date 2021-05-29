package pl.talkapp.server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pl.talkapp.server.entity.Role;
import pl.talkapp.server.entity.Status;
import pl.talkapp.server.repository.RoleRepository;
import pl.talkapp.server.repository.StatusRepository;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

    private final StatusRepository statusRepository;
    private final RoleRepository roleRepository;

    public ServerApplication(StatusRepository statusRepository, RoleRepository roleRepository) {
        this.statusRepository = statusRepository;
        this.roleRepository = roleRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Override
    public void run(String... args) {
        List<Status> statuses =
                Arrays.stream(pl.talkapp.server.model.Status.values())
                        .map(Status::new)
                        .collect(Collectors.toList());

        List<Role> roles =
                Arrays.stream(pl.talkapp.server.model.Role.values())
                        .map(Role::new)
                        .collect(Collectors.toList());

        try {
            statusRepository.saveAll(statuses);
            roleRepository.saveAll(roles);
        } catch (Exception e) {
            System.out.println("Statuses already exists!");
            System.out.println("Roles already exists!");
        }
    }
}
