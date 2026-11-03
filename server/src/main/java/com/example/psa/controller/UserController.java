package com.example.psa.controller;

import com.example.psa.entity.AppUser;
import com.example.psa.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import com.example.psa.dto.Request.UserRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//     GET /api/users
    @GetMapping
    public List<AppUser> getAllUsers() {
        return userService.getAllUsers();
    }

//     GET /api/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable String id) {
        Optional<AppUser> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    GET /api/users/me
    @GetMapping("/me")
    public ResponseEntity<AppUser> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        Optional<AppUser> user = userService.getUserByUsername(username);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/users
    @PostMapping
    public ResponseEntity<AppUser> createUser(@RequestBody UserRequest request) {
        AppUser appUser = userService.createUser(request.username(), request.password(), request.role());
        return ResponseEntity.ok(appUser);
    }

    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}