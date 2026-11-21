package com.example.psa.service;

import com.example.psa.dto.Request.LoginRequest;
import com.example.psa.dto.Request.RegisterRequest;
import com.example.psa.dto.Response.auth.LoginResult;
import com.example.psa.dto.Response.auth.RegisterResponse;
import com.example.psa.dto.Response.auth.ResponseMe;
import com.example.psa.entity.User;
import com.example.psa.entity.UserSession;
import com.example.psa.exception.UsernameTakenException;
import com.example.psa.repository.AuthRepository;
import com.example.psa.repository.EmployeeRepository;
import com.example.psa.repository.SessionRepository;
import com.example.psa.repository.UserRepository;
import com.example.psa.security.CustomUserDetails;
import com.example.psa.security.JwtUtil;
import com.example.psa.security.JwtUtil.TokenClaims;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final SessionRepository sessionRepository;
    private final EmployeeRepository employeeRepository;
    private final AuthRepository authRepository;

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new UsernameTakenException("Username already exists");
        }

        String saltedAndHashedPassword = passwordEncoder.encode(request.password());
        User user = request.toEntity(saltedAndHashedPassword);

        try {
            User savedUser = userRepository.saveAndFlush(user);
            return new RegisterResponse(savedUser.getUsername());
        } catch (DataIntegrityViolationException e) {
            throw new UsernameTakenException("Username already exists");
        }
    }

    @Transactional
    public LoginResult login(LoginRequest request) {
        Authentication accountAuthentication;
            accountAuthentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.username(),
                            request.password()
                    )
            );

        CustomUserDetails userDetails = (CustomUserDetails) accountAuthentication.getPrincipal();
        Objects.requireNonNull(userDetails);
        User user = userDetails.getUser();

        Instant now = Instant.now();
        UserSession session = new UserSession();
        session.setUser(user);
        session.setLastSeenAt(now);
        session.setExpiresAt(Instant.now().plus(Duration.ofDays(3)));
        sessionRepository.save(session);

        String jwt = jwtUtil.generateToken(
                user.getId(),
                session.getId(),
                user.getUsername(),
                user.getRole()
        );

        String name = employeeRepository
                .findEmployeeNameByUserId(user.getId())
                .orElse(user.getUsername());

        return new LoginResult(
                jwt,
                ResponseMe.from(user, name)
        );
    }

    @Transactional(readOnly = true)
    public ResponseMe getCurrentUser(TokenClaims claims) {
        String name = employeeRepository.findEmployeeNameByUserId(claims.userId()).orElse(claims.username());

        return ResponseMe.from(claims, name);
    }

    @Transactional
    public ResponseCookie logoutUser(TokenClaims claims) {
        if (claims != null && claims.sessionId() != null) {
            authRepository.revokeSession(claims.sessionId(), Instant.now());
        }
        return ResponseCookie.from("access_token", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
    }
}