package com.example.psa.config;

import com.example.psa.security.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final RateLimitFilter rateLimitFilter;
    private final CorsConfigurationSource corsConfigurationSource;
    private final RestAuthenticationEntryPoint authenticationEntryPoint;
    private final RestAccessDeniedHandler accessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf
                        .csrfTokenRepository(cookieCsrfTokenRepository())
                        .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler())
                        .ignoringRequestMatchers("/api/auth/login", "/api/auth/register", "/api/auth/logout")
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler))
                .authorizeHttpRequests(auth -> auth
                        // Preflight requests never carry credentials.
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Narrow on purpose: a future /api/auth/me should NOT be public by accident.
                        .requestMatchers("/api/auth/login", "/api/auth/register", "/error").permitAll()
                        .requestMatchers("/api/employees/**").hasAnyRole("ADMIN", "HR") //RESTRICT ALL PATH AFTER /**
                        .requestMatchers("/api/project/**").hasAnyRole("ADMIN", "HR")
                        .requestMatchers(HttpMethod.PATCH, "/api/employees/{id}").hasAnyRole("ADMIN", "HR")
                        .requestMatchers(HttpMethod.POST, "/api/employees/generate/coe").hasAnyRole("ADMIN", "HR") //REDUNDANT FOR NOW BUT FUTURE PROOFING IN FOR REFACTORING IT LATER
                        .anyRequest().authenticated())
                // Order: rate limit -> JWT -> UsernamePasswordAuthenticationFilter -> Filter CsrfCookies
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(rateLimitFilter, JwtFilter.class)
                .addFilterAfter(new CsrfCookieFilter(), CsrfFilter.class);

        return http.build();
    }

    // Both filters are @Component, so Spring Boot would ALSO register them in the servlet
    // container's filter chain. Disable that so they only run inside the security chain.
    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilterRegistration(JwtFilter filter) {
        FilterRegistrationBean<JwtFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setEnabled(false);
        return registration;
    }

    @Bean
    public FilterRegistrationBean<RateLimitFilter> rateLimitFilterRegistration(RateLimitFilter filter) {
        FilterRegistrationBean<RateLimitFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setEnabled(false);
        return registration;
    }

    @Value("${app.cookie.secure:true}")
    private boolean secureCookies;

    private CookieCsrfTokenRepository cookieCsrfTokenRepository() {
        CookieCsrfTokenRepository repo = CookieCsrfTokenRepository.withHttpOnlyFalse();
        repo.setCookieCustomizer(c -> c.sameSite("Lax").secure(secureCookies));
        return repo;
    }
}