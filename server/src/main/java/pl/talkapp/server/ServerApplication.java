package pl.talkapp.server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pl.talkapp.server.model.Status;
import pl.talkapp.server.repository.StatusRepository;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

    private final StatusRepository statusRepository;

    public ServerApplication(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Override
    public void run(String... args) {
        Set<Status> statuses =
                Arrays.stream(pl.talkapp.server.Status.values())
                        .map(status -> new Status(status))
                        .collect(Collectors.toSet());

        try {
            statusRepository.saveAll(statuses);
        } catch (Exception e) {
            System.out.println("Statuses already exists!");
        }
    }
}
