package com.example.psa.dto.response.auth;

public record LoginResult(
        String jwt,
        ResponseMe response
) {}
