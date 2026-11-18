package com.example.psa.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.csrf.CsrfException;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Map;

/** Returns a JSON 403 when access is denied (missing/invalid CSRF token or lacking role). */
@Slf4j
@Component
public class RestAccessDeniedHandler implements AccessDeniedHandler {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException ex) throws IOException {

        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        log.warn("Access denied: {} {} users={} authorities={} reason={}",
                request.getMethod(), request.getRequestURI(),
                auth != null ? auth.getName() : "anonymous",
                auth != null ? auth.getAuthorities() : "none",
                ex.getClass().getSimpleName());

        String message = (ex instanceof CsrfException)
                ? "Invalid or missing CSRF token"
                : "You do not have permission to access this resource";

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), Map.of(
                "status", 403,
                "error", "Forbidden",
                "message", message
        ));
    }
}