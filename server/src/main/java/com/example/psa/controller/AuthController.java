package com.example.psa.controller;

import com.example.psa.dto.Request.LoginRequest;
import com.example.psa.dto.Request.RegisterRequest;
import com.example.psa.dto.Response.LoginResponse;
import com.example.psa.dto.Response.LoginResult;
import com.example.psa.dto.Response.RegisterResponse;
import com.example.psa.security.AuthCookieFactory;
import com.example.psa.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResult result = authService.login(request);

        ResponseCookie cookie = cookieFactory.create(result.jwt());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(result.response());
    }
}