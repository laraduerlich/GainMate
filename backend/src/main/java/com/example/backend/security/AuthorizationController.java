package com.example.backend.security;

import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDTO;
import com.example.backend.security.model.AppUserResponse;
import com.example.backend.service.AppUserService;
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
    public ResponseEntity<AppUserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        String username = user.getUsername();
        AppUser appUser = appUserService.findByUsername(username);
        AppUserResponse response = AppUserResponse.builder()
                .id(appUser.id())
                .username(appUser.username())
                .name(appUser.name())
                .exerciseIdList(appUser.exerciseIdList())
                .workoutIdList(appUser.workoutIdList())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public void login() {
        // This method is only here to make the login endpoint accessible to the frontend
    }

    @PostMapping("/logout")
    public void logoutUser(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }
}
