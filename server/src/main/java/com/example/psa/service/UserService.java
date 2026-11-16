package com.example.psa.service;

import com.example.psa.entity.AppUser;
import com.example.psa.enums.Role;
import com.example.psa.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // Get all users
    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<AppUser> getUserById(UUID id) {
        return userRepository.findById(id);
    }

//    Get User by name
    public Optional<AppUser> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Create user
    public AppUser createUser(String username, String password, Role role) {
        AppUser appUser = new AppUser();
        appUser.setUsername(username);
        appUser.setPassword(password);
        appUser.setRole(role);
        appUser.setCreatedAt(LocalDateTime.now());
        return userRepository.save(appUser);
    }

    // Delete user
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}