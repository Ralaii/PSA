package com.example.psa.dto.Request;

import com.example.psa.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
//        @NotBlank(message = "First Name required")
//        String firstName,
//
//        @NotBlank(message = "Last Name required")
//        String lastName,

        @NotBlank(message = "Username required")
        @Size(min =4, max =20, message = "Username must be between 3 and 20 characters")
        String username,

        @NotBlank(message = "Password must not be empty")
        @Size(min = 8, max = 72, message = "Password must be between 8 and 72 characters")
        String password

) {
        public User toEntity(String encryptedPassword) {
                User user = new User();
                user.setUsername(username);
                user.setPassword(encryptedPassword);
                return user;
        }
}
