package pl.talkapp.server.service.status;

import pl.talkapp.server.entity.Status;

public interface StatusService {
    Status getOnline();

    Status getOffline();

    Status getBusy();
}
