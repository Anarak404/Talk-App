package pl.talkapp.server.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import pl.talkapp.server.model.BlacklistAction;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlacklistRequest {

    @Min(1)
    @NotNull
    Long id;

    BlacklistAction action;

}
