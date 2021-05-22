package pl.talkapp.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class CallRequest {

    Double locationX;

    Double locationY;

    public boolean isNotEmpty() {
        return locationX != null && locationY != null;
    }

}
