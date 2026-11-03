package com.example.psa.dto.Request;

import com.example.psa.entity.Role;

public record UserRequest(String username, String password, Role role) {}
