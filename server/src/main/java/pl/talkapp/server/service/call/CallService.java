package pl.talkapp.server.service.call;

import pl.talkapp.server.model.User;

public interface CallService {

    Long startWithoutLocation(User caller, User attender);

    Long startWithLocation(User caller, User attender, Double callerX, Double callerY);

    Long joinWithoutLocation(Long id);

    Long joinWithLocation(Long id, Double attenderX, Double attenderY);

}
