package pl.talkapp.server.eventBus;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
@EqualsAndHashCode(callSuper = true)
public abstract class ChannelEvent<T> extends ApplicationEvent {

    protected final T payload;

    public ChannelEvent(Object source, T payload) {
        super(source);
        this.payload = payload;
    }

}
