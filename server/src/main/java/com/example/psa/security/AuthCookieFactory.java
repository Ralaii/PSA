package com.example.psa.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class AuthCookieFactory {
    public static final String COOKIE_NAME = "access";

    @Value("${app.cookie.secure:true}")
    private boolean secure;

    private ResponseCookie.ResponseCookieBuilder base(String value) {
        return ResponseCookie.from(COOKIE_NAME, value)
                .httpOnly(true)
                .secure(secure)
                .sameSite("Lax")
                .path("/");
    }

    public ResponseCookie create(String jwt) {
        return base(jwt).maxAge(Duration.ofDays(3)).build();
    }

    public ResponseCookie clear() {
        return base("")
                .maxAge(0)
                .build();
    }
}
