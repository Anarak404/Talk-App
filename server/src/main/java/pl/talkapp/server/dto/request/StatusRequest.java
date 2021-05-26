package pl.talkapp.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import pl.talkapp.server.model.Status;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusRequest {

    Status status;

}
