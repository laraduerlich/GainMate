package com.example.backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthorizationController {

    private final AppUserService appUserService;

    @GetMapping("/me")
    public ResponseEntity<AppUserDTO> getCurrentUser(@AuthenticationPrincipal User user) {
        String username = user.getUsername();
        AppUserDTO dto = appUserService.findByUsername(username);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/login")
    public void login() {
        // This method is only here to make the login endpoint accessible to the frontend
    }

    @PostMapping("/register")
    public ResponseEntity<AppUserDTO> registerUser(@RequestBody AppUser newUser) {
        try {
            AppUserDTO dto = appUserService.createUser(newUser);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/logout")
    public void logoutUser(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }
}
