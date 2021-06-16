package pl.talkapp.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CallRequest {

    Double locationX;

    Double locationY;

    public boolean isNotEmpty() {
        return locationX != null && locationY != null;
    }

}
