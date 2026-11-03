package com.example.psa.dto.Response;

import com.example.psa.entity.Role;

public record LoginResponse(
        String token,
        String username,
        Role role
) {}