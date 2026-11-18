package com.example.psa.dto.Response.auth;

public record LoginResult(
        String jwt,
        LoginResponse response
) {}
