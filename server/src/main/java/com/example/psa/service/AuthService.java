package com.example.psa.service;

import com.example.psa.dto.Request.LoginRequest;
import com.example.psa.dto.Request.RegisterRequest;
import com.example.psa.dto.Response.auth.LoginResponse;
import com.example.psa.dto.Response.auth.LoginResult;
import com.example.psa.dto.Response.auth.RegisterResponse;
import com.example.psa.entity.User;
import com.example.psa.entity.UserSession;
import com.example.psa.enums.Role;
import com.example.psa.repository.SessionRepository;
import com.example.psa.repository.UserRepository;
import com.example.psa.security.CustomUserDetails;
import com.example.psa.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final SessionRepository sessionRepository;

    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        String saltedAndHashedPassword = passwordEncoder.encode(request.password());

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(saltedAndHashedPassword);
        user.setRole(Role.USER);
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);

        return new RegisterResponse(user.getUsername());
    }

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
        return new LoginResult(
                jwt,
                new LoginResponse(user.getUsername(), user.getRole())
        );
    }
}