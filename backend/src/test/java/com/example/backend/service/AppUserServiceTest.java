package com.example.backend.service;

import com.example.backend.repo.AppUserRepo;
import com.example.backend.security.model.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AppUserServiceTest {

    private final AppUserRepo appUserRepo = mock(AppUserRepo.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final IdService idService = mock(IdService.class);

    private final ExerciseService exerciseService = mock(ExerciseService.class);
    private final WorkoutService workoutService = mock(WorkoutService.class);

    // --------------------------------------- DELETE USER --------------------------------------
    @Test
    void deleteUser_shouldDeleteUser_whenCalledWithValidUser() throws UsernameNotFoundException {
        // GIVEN
        AppUserService appUserService = new AppUserService(appUserRepo, passwordEncoder, idService, exerciseService, workoutService);
        User user = new User("testUser", "testPassword", Collections.emptyList());

        when(appUserRepo.findByUsername(user.getUsername())).thenReturn(Optional.ofNullable(AppUser.builder().build()));

        // WHEN
        appUserService.deleteUser(user);

        // THEN
        verify(appUserRepo).delete(any());
        verify(exerciseService).deleteAllExercise(any());
        verify(workoutService).deleteAllWorkouts(any());
    }

    @Test
    void deleteUser_shouldThrowException_whenCalledWithInvalidUser() throws UsernameNotFoundException {
        // GIVEN
        AppUserService appUserService = new AppUserService(appUserRepo, passwordEncoder, idService, exerciseService, workoutService);
        User user = new User("testUser", "testPassword", Collections.emptyList());

        when(appUserRepo.findByUsername(user.getUsername())).thenReturn(Optional.empty());

        // WHEN & THEN
        try {
            appUserService.deleteUser(user);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals(user.getUsername(), e.getMessage());
        }
    }
}