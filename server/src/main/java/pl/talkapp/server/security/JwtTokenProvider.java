package pl.talkapp.server.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@Service
public class JwtTokenProvider {

    @Value("${security.jwt.token.secret-key:invalidkey}")
    private String secretKey;

    @Value("${security.jwt.token.expire-length:300000}")
    private long tokenValidityInMilliseconds;

    @Value("${security.jwt.refresh-token.expire-length:300000}")
    private long refreshTokenValidityInMilliseconds;

    @Value("${security.jwt.token.header:Authorization}")
    private String authorizationHeader;

    @Value("${security.jwt.refresh-token.header:Authorization}")
    private String refreshAuthorizationHeader;

    private Algorithm algorithm;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        algorithm = Algorithm.HMAC256(secretKey);
    }

    public String createToken(Long userId) {
        Date now = new Date();
        Date tokenExpirationDate = new Date(now.getTime() + tokenValidityInMilliseconds);

        return getToken(userId, now, tokenExpirationDate);
    }

    public String createRefreshToken(Long userId) {
        Date now = new Date();
        Date refreshTokenExpirationDate =
                new Date(now.getTime() + refreshTokenValidityInMilliseconds);

        return getToken(userId, now, refreshTokenExpirationDate);
    }

    private String getToken(Long userId, Date now, Date tokenExpirationDate) {
        return JWT.create()
                .withSubject(String.valueOf(userId))
                .withIssuedAt(now)
                .withExpiresAt(tokenExpirationDate)
                .sign(algorithm);
    }

    public boolean validateToken(String token) {
        try {
            JWTVerifier jwtVerifier = JWT.require(algorithm).build();
            jwtVerifier.verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Long getUserId(String token) {
        return Long.valueOf(JWT.require(algorithm).build().verify(token).getSubject());
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(authorizationHeader);

        return getToken(bearerToken);
    }

    public String resolveRefreshToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(refreshAuthorizationHeader);

        return getToken(bearerToken);
    }

    private String getToken(String bearerToken) {
        String prefix = "Bearer ";

        if (bearerToken != null && bearerToken.startsWith(prefix)) {
            return bearerToken.replace(prefix, "");
        }

        return null;
    }

    public Authentication getAuthentication(String token) {
        return new UsernamePasswordAuthenticationToken(getUserId(token), "",
                Collections.emptyList());
    }

}
