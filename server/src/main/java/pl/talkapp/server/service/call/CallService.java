package pl.talkapp.server.service.call;

import pl.talkapp.server.entity.Call;
import pl.talkapp.server.entity.User;

public interface CallService {

    Call startWithoutLocation(User caller, User attender);

    Call startWithLocation(User caller, User attender, Double callerX, Double callerY);

    long endCall(Call call);

    void notifyUser(User caller, Long callTo, Long callId);

}
