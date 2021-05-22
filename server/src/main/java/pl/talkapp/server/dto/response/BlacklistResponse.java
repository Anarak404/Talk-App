package pl.talkapp.server.dto.response;

import lombok.Value;
import pl.talkapp.server.model.Blacklist;

import java.util.List;

@Value
public class BlacklistResponse {

    List<Blacklist> userBlacklists;

}
