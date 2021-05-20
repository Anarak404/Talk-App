package pl.talkapp.server.service.status;

import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Status;
import pl.talkapp.server.repository.StatusRepository;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatusServiceImpl implements StatusService {

    Map<pl.talkapp.server.model.Status, Status> statuses;

    public StatusServiceImpl(StatusRepository statusRepository) {
        statuses = statusRepository.findAll().stream().collect(Collectors.toMap(Status::getName,
                status -> status));
    }

    @Override
    public Status getOnline() {
        return statuses.get(pl.talkapp.server.model.Status.ONLINE);
    }

    @Override
    public Status getOffline() {
        return statuses.get(pl.talkapp.server.model.Status.OFFLINE);
    }

    @Override
    public Status getBusy() {
        return statuses.get(pl.talkapp.server.model.Status.BUSY);
    }
}
