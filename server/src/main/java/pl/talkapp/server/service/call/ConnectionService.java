package pl.talkapp.server.service.call;

public interface ConnectionService {

    void joinCall(Long callId, String userId);

    void disconnect(String userId);
}
