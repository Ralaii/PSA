package com.example.psa.dto.Response;

import com.example.psa.enums.Role;

public record LoginResponse(
        String username,
        Role role
) {}