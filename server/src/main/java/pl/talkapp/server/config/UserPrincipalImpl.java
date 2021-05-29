package pl.talkapp.server.config;

import lombok.AccessLevel;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import javax.security.auth.Subject;
import java.nio.file.attribute.UserPrincipal;

@Value
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserPrincipalImpl implements UserPrincipal {

    String name;

    @Override
    public String getName() {
        return name;
    }

    @Override
    public boolean implies(Subject subject) {
        return true;
    }
}
