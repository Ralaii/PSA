package com.example.psa.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "First Name required")
        String firstName,

        @NotBlank(message = "Last Name required")
        String lastName,

        @NotBlank(message = "Username required")
        @Size(min =4, max =20, message = "Username must be between 3 and 20 characters")
        String username,

        @NotBlank(message = "Password must not be empty")
        @Size(min = 6, message = "Password must be at least 6 characters")
        String password
) {}
