package com.example.backend.security;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/me")
public class AuthorizationController {

    @GetMapping
    public ResponseEntity<String> getCurrentUser(@AuthenticationPrincipal User user) {
        String username = user.getUsername();
        return ResponseEntity.ok(username);
    }
}
