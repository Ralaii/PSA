package com.example.psa.security;

import com.example.psa.enums.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {
    public enum TokenStatus {
        VALID,
        EXPIRED,
        INVALID,
        REFRESHED
    }
    public record TokenClaims(
            UUID userId,
            UUID sessionId,
            String username,
            Role role
    ) {}

    public record ParsedToken(
        TokenStatus status,
        TokenClaims claims
    ) {}

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey signingKey;

    @PostConstruct
    void init() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            throw new IllegalStateException("Secret key length must be at least 32 bytes");
        }
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UUID userId, UUID sessionId, String username, Role role) {
        Date now = new Date();

        return Jwts.builder()
                .subject(userId.toString())
                .claim("sid", sessionId.toString())
                .claim("username", username)
                .claim("role", role.name())
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration))
                .signWith(signingKey)
                .compact();
    }

    private TokenClaims tokenClaims(Claims c) {
        return new TokenClaims(
                UUID.fromString(c.getSubject()),
                UUID.fromString(c.get("sid", String.class)),
                c.get("username", String.class),
                Role.valueOf(c.get("role", String.class))
        );
    }

    public ParsedToken parsedToken(String token) {
        try {
            Claims claims = (Claims) Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return new ParsedToken(TokenStatus.VALID, tokenClaims(claims));
        } catch (ExpiredJwtException e) {
            try {
                return new ParsedToken(TokenStatus.EXPIRED, tokenClaims(e.getClaims()));
            } catch (RuntimeException ex) {
                return new ParsedToken(TokenStatus.INVALID, null);
            }
        } catch (JwtException | IllegalArgumentException e) {
            return new ParsedToken(TokenStatus.INVALID, null);
        }
    }
}