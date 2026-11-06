package com.example.psa.dto.Request;

import com.example.psa.enums.Role;

public record UserRequest(String username, String password, Role role) {}
