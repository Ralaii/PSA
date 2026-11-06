package com.example.psa.dto.Response;

public record LoginResult(
        String jwt,
        LoginResponse response
) {}
