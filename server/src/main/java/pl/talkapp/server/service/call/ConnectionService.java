package pl.talkapp.server.service.call;

public interface ConnectionService {

    void joinPrivateChannel(long channelId, String userId);

    void joinServerChannel(long serverId, String userId);

    void disconnect(String userId);
}
