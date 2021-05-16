package pl.talkapp.server.service.call;

import pl.talkapp.server.model.User;

public interface CallService {

    Long startWithoutLocation(User caller, User attender);

    Long startWithLocation(User caller, User attender, Double callerX, Double callerY);

    Long joinWithoutLocation(User caller, User attender);

    Long joinWithLocation(User caller, User attender, Double attenderX, Double attenderY);

}
