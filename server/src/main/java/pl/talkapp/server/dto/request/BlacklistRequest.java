package pl.talkapp.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import pl.talkapp.server.model.BlacklistAction;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class BlacklistRequest {

    Long id;

    BlacklistAction action;

}
