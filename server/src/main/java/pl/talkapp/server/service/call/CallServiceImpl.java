package pl.talkapp.server.service.call;

import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.stereotype.Service;
import pl.talkapp.server.model.Call;
import pl.talkapp.server.model.User;
import pl.talkapp.server.repository.CallRepository;

import java.util.NoSuchElementException;
import java.util.Optional;

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

    public Long joinWithoutLocation(User caller, User attender) {
        Call call = getCall(caller, attender);

        return call.getId();
    }

    public Long joinWithLocation(User caller, User attender, Double attenderX,
                                 Double attenderY) {
        Call call = getCall(caller, attender);

        call.setAttenderX(attenderX);
        call.setAttenderY(attenderY);

        callRepository.save(call);

        return call.getId();
    }

    private Call getCall(User caller, User attender) {
        return callRepository.findCallByCallerAndAttenderAndEndDateTimeIsNull(caller,
                attender).orElseThrow(() -> {
            throw new NoSuchElementException("Call does not exist");
        });
    }

}
