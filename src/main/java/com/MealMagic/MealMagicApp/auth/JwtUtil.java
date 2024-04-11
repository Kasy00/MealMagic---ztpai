package com.MealMagic.MealMagicApp.auth;

import com.MealMagic.MealMagicApp.model.User;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.naming.AuthenticationException;
import jakarta.servlet.http.HttpServletRequest;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.List;


@Component
public class JwtUtil {

    private String secretKey;
    private long accessTokenValidityMillis = 30 * 24 * 60 * 60;

    private JwtParser jwtParser;

    private static final String TOKEN_HEADER = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";

    @PostConstruct
    public void init() {
        SecureRandom random = new SecureRandom();
        byte[] keyBytes = new byte[32];
        random.nextBytes(keyBytes);
        this.secretKey = Base64.getEncoder().encodeToString(keyBytes);

        this.jwtParser = Jwts.parserBuilder().setSigningKey(secretKey).build();
    }

    public String createToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getEmail());
        claims.put("username", user.getUsername());

        Date now = new Date();
        Date expiration = new Date(now.getTime() + accessTokenValidityMillis);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Claims parseJwtClaims(String token) {
        return jwtParser.parseClaimsJws(token).getBody();
    }

    public Claims resolveClaims(HttpServletRequest request) {
        String token = resolveToken(request);
        if (token != null) {
            return parseJwtClaims(token);
        }
        return null;
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(TOKEN_HEADER);
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    public boolean validateClaims(Claims claims) throws AuthenticationException {
        try {
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            throw e;
        }
    }

    public String getEmailFromClaims(Claims claims) {
        return claims.getSubject();
    }

    public List<String> getRolesFromClaims(Claims claims) {
        return claims.get("roles", List.class);
    }
}