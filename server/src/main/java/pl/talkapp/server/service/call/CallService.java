package pl.talkapp.server.service.call;

import pl.talkapp.server.entity.Call;
import pl.talkapp.server.entity.User;

import java.util.Optional;

public interface CallService {

    Call startWithoutLocation(User caller, User attender);

    Call startWithLocation(User caller, User attender, Double callerX, Double callerY);

    void joinWithoutLocation(Call call, User user);

    void joinWithLocation(Call call, User user, Double attenderX, Double attenderY);

    Optional<Call> getOngoingCall(User user1, User user2);

    long endCall(Call call);

}
