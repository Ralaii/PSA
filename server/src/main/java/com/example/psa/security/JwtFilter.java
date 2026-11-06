package com.example.psa.security;

import com.example.psa.service.SessionService;
import com.example.psa.security.JwtUtil.TokenClaims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final SessionService sessionService;
    private final AuthCookieFactory cookieFactory;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String token = readCookie(request);

        if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            JwtUtil.ParsedToken parsed = jwtUtil.parsedToken(token);

            switch (parsed.status()) {
                case VALID -> {
                    if (sessionService.isSessionActive(parsed.claims().sessionId())) {
                        authenticate(parsed.claims(), request);
                    };
                }
                case EXPIRED -> refresh(parsed.claims(), request, response);
                default -> {}
            }
        }
        chain.doFilter(request, response);
    }
    private void refresh(TokenClaims old, HttpServletRequest req, HttpServletResponse res){
        sessionService.refresh(old.sessionId()).ifPresentOrElse(user -> {
            String newJwt = jwtUtil.generateToken(
                    user.getId(),
                    old.sessionId(),
                    user.getUsername(),
                    user.getRole()
            );
            res.addHeader(HttpHeaders.SET_COOKIE, cookieFactory.create(newJwt).toString());

        authenticate(new TokenClaims(
                user.getId(),
                old.sessionId(),
                user.getUsername(),
                user.getRole()),
                req
        );
        }, () -> res.addHeader(HttpHeaders.SET_COOKIE, cookieFactory.clear().toString()));
    }

    private void authenticate(TokenClaims claims, HttpServletRequest req) {
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + claims.role().name()));
        var auth = new UsernamePasswordAuthenticationToken(claims, null, authorities);
        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    private String readCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if (AuthCookieFactory.COOKIE_NAME.equals(cookie.getName())) return cookie.getValue();
        }
        return null;
    }
}