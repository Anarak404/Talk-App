package pl.talkapp.server.eventBus;

public class GeolocationEvent<T> extends ChannelEvent<T> {
    public GeolocationEvent(Object source, T payload) {
        super(source, payload);
    }
}
