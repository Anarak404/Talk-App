package pl.talkapp.server.service.authorization;

public interface UserAuthorization {
    boolean authorize(Long userId, Long callId);
}
