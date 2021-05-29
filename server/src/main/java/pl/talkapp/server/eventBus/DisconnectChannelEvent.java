package pl.talkapp.server.eventBus;

public class DisconnectChannelEvent<T> extends ChannelEvent<T> {

    public DisconnectChannelEvent(Object source, T payload) {
        super(source, payload);
    }
}
