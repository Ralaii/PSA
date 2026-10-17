package com.example.psa.security;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Set;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private static final int GENERAL_LIMIT_PER_MINUTE = 20;
    private static final int AUTH_LIMIT_PER_MINUTE = 5;

    // Endpoints that get the tighter limit (credential stuffing / signup abuse).
    private static final Set<String> STRICT_PATHS = Set.of("/api/auth/login", "/api/auth/register");

    // Idle entries are evicted, and the size is capped, so the map can't grow forever.
    private final Cache<String, Bucket> generalBuckets = newCache();
    private final Cache<String, Bucket> authBuckets = newCache();

    private static Cache<String, Bucket> newCache() {
        return Caffeine.newBuilder()
                .expireAfterAccess(Duration.ofMinutes(10))
                .maximumSize(100_000)
                .build();
    }

    private static Bucket createBucket(int perMinute) {
        Bandwidth limit = Bandwidth.simple(perMinute, Duration.ofMinutes(1));
        return Bucket.builder().addLimit(limit).build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // CORS preflights shouldn't burn a client's quota.
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Behind a proxy, set server.forward-headers-strategy=native (or framework)
        // so this returns the real client IP instead of the proxy's.
        String ip = request.getRemoteAddr();

        boolean strict = STRICT_PATHS.contains(request.getRequestURI());
        Bucket bucket = strict
                ? authBuckets.get(ip, k -> createBucket(AUTH_LIMIT_PER_MINUTE))
                : generalBuckets.get(ip, k -> createBucket(GENERAL_LIMIT_PER_MINUTE));

        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

        if (probe.isConsumed()) {
            filterChain.doFilter(request, response);
            return;
        }

        long retryAfterSeconds = Math.max(1, Duration.ofNanos(probe.getNanosToWaitForRefill()).toSeconds());
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setHeader("Retry-After", String.valueOf(retryAfterSeconds));
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(
                "{\"status\":429,\"error\":\"Too Many Requests\",\"message\":\"Too many requests, try again in "
                        + retryAfterSeconds + "s\"}");
    }
}