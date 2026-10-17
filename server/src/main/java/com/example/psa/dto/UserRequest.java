package com.example.psa.dto;

import com.example.psa.entity.Role;

public record UserRequest(String username, String password, Role role) {}
