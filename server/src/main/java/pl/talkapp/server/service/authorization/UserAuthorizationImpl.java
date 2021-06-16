package pl.talkapp.server.service.authorization;

public class UserAuthorizationImpl implements UserAuthorization {

    @Override
    public boolean authorize(Long userId, Long callId) {
        return false;
    }
}
