package com.example.psa.dto.Response.auth;

import com.example.psa.entity.User;
import com.example.psa.enums.Role;
import com.example.psa.security.JwtUtil.TokenClaims;

import java.util.UUID;

public record ResponseMe(
        UUID id,
        String name,
        Role role
) {
        public static ResponseMe from(TokenClaims claims, String name) {
            return new ResponseMe(claims.userId(), name, claims.role());
        }

        public static ResponseMe from(User user, String name) {
            return new ResponseMe(user.getId(), name, user.getRole());
        }
}
