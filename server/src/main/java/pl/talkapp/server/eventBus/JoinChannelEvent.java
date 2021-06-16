package pl.talkapp.server.eventBus;

public class JoinChannelEvent<T> extends ChannelEvent<T> {

    public JoinChannelEvent(Object source, T payload) {
        super(source, payload);
    }

}
