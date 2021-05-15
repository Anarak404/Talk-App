package pl.talkapp.server.service.call;

import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.stereotype.Service;
import pl.talkapp.server.model.Call;
import pl.talkapp.server.model.User;
import pl.talkapp.server.repository.CallRepository;

@Service
public class CallServiceImpl implements CallService {

    private final CallRepository callRepository;

    public CallServiceImpl(CallRepository callRepository) {
        this.callRepository = callRepository;
    }

    public Long startWithoutLocation(User caller, User attender) {
        Call call = Call.builder()
                .caller(caller)
                .attender(attender)
                .build();

        callRepository.save(call);

        return call.getId();
    }

    public Long startWithLocation(User caller, User attender, Double callerX,
                                  Double callerY) {
        Call call = Call.builder()
                .caller(caller)
                .attender(attender)
                .callerX(callerX)
                .callerY(callerY)
                .build();

        callRepository.save(call);

        return call.getId();
    }

    public Long joinWithoutLocation(Long id) {
        throw new NotYetImplementedException();
    }

    public Long joinWithLocation(Long id, Double attenderX, Double attenderY) {
        throw new NotYetImplementedException();
    }

}
