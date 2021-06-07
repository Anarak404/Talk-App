package pl.talkapp.server.service.call;

import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import pl.talkapp.server.entity.Call;
import pl.talkapp.server.entity.User;
import pl.talkapp.server.model.websocket.Caller;
import pl.talkapp.server.model.websocket.IncomingCall;
import pl.talkapp.server.repository.CallRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CallServiceImpl implements CallService {

    private final CallRepository callRepository;
    private final SimpMessagingTemplate template;

    public CallServiceImpl(CallRepository callRepository, SimpMessagingTemplate template) {
        this.callRepository = callRepository;
        this.template = template;
    }

    @Override
    public Call startWithoutLocation(User caller, User attender) {
        Call call = Call.builder()
            .caller(caller)
            .attender(attender)
            .build();

        callRepository.save(call);

        return call;
    }

    @Override
    public Call startWithLocation(User caller, User attender, Double callerX,
                                  Double callerY) {
        Call call = Call.builder()
            .caller(caller)
            .attender(attender)
            .callerX(callerX)
            .callerY(callerY)
            .build();

        callRepository.save(call);

        return call;
    }

    @Override
    public void joinWithoutLocation(Call call, User user) {
        // TODO: dodać łączenie z websocketami
        throw new NotYetImplementedException();
    }

    @Override
    public void joinWithLocation(Call call, User user, Double attenderX,
                                 Double attenderY) {
        call.setAttenderX(attenderX);
        call.setAttenderY(attenderY);

        callRepository.save(call);

        // TODO: dodać łączenie z websocketami
    }

    @Override
    public Optional<Call> getOngoingCall(User user1, User user2) {
        return callRepository.findOngoingCall(user1, user2);
    }

    @Override
    public long endCall(Call call) {
        call.setEndDateTime(Timestamp.valueOf(LocalDateTime.now()));
        callRepository.save(call);

        return call.getEndDateTime().getTime() - call.getStartDateTime().getTime();
    }

    @Override
    public void notifyUser(User caller, Long callTo, Long callId) {
        template.convertAndSendToUser(callTo.toString(), "/call", new IncomingCall(callId,
            new Caller(caller)));
    }

}
