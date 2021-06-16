package pl.talkapp.server.service.call;

import pl.talkapp.server.model.Location;

public interface ConnectionService {

    void joinCall(Long callId, String userId, Location location);

    void disconnect(String userId);

    void rejectCall(Long userId, Long callId);

}
