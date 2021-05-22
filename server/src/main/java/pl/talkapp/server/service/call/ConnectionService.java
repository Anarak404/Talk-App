package pl.talkapp.server.service.call;

public interface ConnectionService {

    void joinPrivateChannel(long channelId, String sessionId);

    void joinServerChannel(long serverId, String sessionId);

    void disconnect(String sessionId);
}
