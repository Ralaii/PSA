package com.example.psa.dto.Response.auth;

import com.example.psa.entity.Employee;
import com.example.psa.entity.User;
import com.example.psa.enums.Role;
import com.example.psa.security.JwtUtil.TokenClaims;
import com.example.psa.security.JwtUtil;

import java.util.UUID;

public record ResponseMe(
        UUID id,
        String name,
        Role role
) {
        public static ResponseMe from(TokenClaims claims, Employee employee) {
            return build(claims.userId(), claims.username(), claims.role(), employee);
        }

        public static ResponseMe from(User user, Employee employee) {
            return build(user.getId(), user.getUsername(), user.getRole(), employee);
        }

        private static ResponseMe build(UUID id, String username, Role role, Employee employee) {
            String name = (employee != null) ? employee.getFirstName() : username;
            return new ResponseMe(id, name, role);
        }
}
