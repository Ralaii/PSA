package com.example.psa.controller;

import com.example.psa.dto.Request.LoginRequest;
import com.example.psa.dto.Request.RegisterRequest;
import com.example.psa.dto.Response.auth.LoginResult;
import com.example.psa.dto.Response.auth.RegisterResponse;
import com.example.psa.dto.Response.auth.ResponseMe;
import com.example.psa.security.AuthCookieFactory;
import com.example.psa.security.JwtUtil.TokenClaims;
import com.example.psa.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthCookieFactory cookieFactory;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseMe> login(@Valid @RequestBody LoginRequest request) {
        LoginResult result = authService.login(request);

        ResponseCookie cookie = cookieFactory.create(result.jwt());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(result.response());
    }

    @GetMapping("/me")
    public ResponseMe me(@AuthenticationPrincipal TokenClaims claims) {
        return authService.getCurrentUser(claims);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@AuthenticationPrincipal TokenClaims claims) {
        ResponseCookie clearedCookie = authService.logoutUser(claims);

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, clearedCookie.toString())
                .build();
    }
}