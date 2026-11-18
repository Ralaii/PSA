package com.example.psa.dto.Response.auth;

import com.example.psa.enums.Role;

public record LoginResponse(
        String username,
        Role role
) {}