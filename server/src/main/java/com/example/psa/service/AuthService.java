package com.example.psa.service;

import com.example.psa.dto.Request.LoginRequest;
import com.example.psa.dto.Request.RegisterRequest;
import com.example.psa.dto.Response.LoginResponse;
import com.example.psa.dto.Response.LoginResult;
import com.example.psa.dto.Response.RegisterResponse;
import com.example.psa.entity.UserSession;
import com.example.psa.enums.AccountStatus;
import com.example.psa.enums.Role;
import com.example.psa.entity.AppUser;
import com.example.psa.exception.AccountNotActiveException;
import com.example.psa.repository.SessionRepository;
import com.example.psa.repository.UserRepository;
import com.example.psa.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final SessionRepository sessionRepository;

    public RegisterResponse register(@Valid RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        AppUser appUser = new AppUser();
        appUser.setUsername(request.username());
        appUser.setPassword(passwordEncoder.encode(request.password()));
        appUser.setRole(Role.USER);
        appUser.setCreatedAt(LocalDateTime.now());
        userRepository.save(appUser);

        return new RegisterResponse(appUser.getUsername());
    }

    public LoginResult login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.username(),
                            request.password()
                    )
            );
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username and password");
        }

        AppUser user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new BadCredentialsException("Invalid username"));

        if (user.getStatus() != AccountStatus.ACTIVE) {
            throw new AccountNotActiveException(user.getStatus());
        }

        UserSession session = new UserSession();
        session.setUser(user);
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