package com.example.psa.dto.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "First Name required")
        @JsonProperty(value = "first_name")
        String firstName,

        @NotBlank(message = "Last Name required")
        @JsonProperty(value = "last_name")
        String lastName,

        @NotBlank(message = "Username required")
        @Size(min =4, max =20, message = "Username must be between 3 and 20 characters")
        String username,

        @NotBlank(message = "Password must not be empty")
        @Size(min = 6, message = "Password must be at least 6 characters")
        String password
) {}
