package pl.talkapp.server.eventBus;

import lombok.EqualsAndHashCode;
import lombok.Value;
import org.springframework.context.ApplicationEvent;

@Value
@EqualsAndHashCode(callSuper = true)
public class ChannelEvent<T> extends ApplicationEvent {

    T payload;

    public ChannelEvent(Object source, T payload) {
        super(source);
        this.payload = payload;
    }

}
