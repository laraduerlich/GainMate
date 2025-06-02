package com.example.backend.service;

import com.example.backend.repo.AppUserRepo;
import com.example.backend.repo.ExerciseRepo;
import com.example.backend.repo.WorkoutRepo;
import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDTO;
import com.example.backend.security.model.AppUserResponse;
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
    private final ExerciseRepo exerciseRepo = mock(ExerciseRepo.class);
    private final WorkoutRepo workoutRepo = mock(WorkoutRepo.class);

    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final IdService idService = mock(IdService.class);


    // --------------------------------------- UPDATE USER --------------------------------------
    @Test
    void updateUser_shouldUpdateUser_whenCalledWithValidUser() throws UsernameNotFoundException {
        // GIVEN
        AppUserService appUserService = new AppUserService(appUserRepo, exerciseRepo, workoutRepo, passwordEncoder, idService);
        User user = new User("testUser", "testPassword", Collections.emptyList());
        AppUser appUser = AppUser.builder().id("1").username("testUser").build();
        AppUserDTO updatedUser = AppUserDTO.builder().username("testUser2").build();
        AppUserResponse expected = AppUserResponse.builder().username("testUser2").build();

        when(appUserRepo.findByUsername(user.getUsername())).thenReturn(Optional.ofNullable(appUser));
        when(passwordEncoder.encode(updatedUser.password())).thenReturn("123");

        // WHEN
        AppUserResponse actual = appUserService.updateUser(user, updatedUser);

        // THEN
        assertEquals(expected, actual);
    }

    @Test
    void updateUser_shouldThrowException_whenCalledWithInvalidUser() throws UsernameNotFoundException {
        // GIVEN
        AppUserService appUserService = new AppUserService(appUserRepo, exerciseRepo, workoutRepo, passwordEncoder, idService);
        User user = new User("testUser", "testPassword", Collections.emptyList());
        AppUserDTO updatedUser = AppUserDTO.builder().username("testUser2").build();

        when(appUserRepo.findByUsername(user.getUsername())).thenReturn(Optional.empty());

        // WHEN & THEN
        try {
            appUserService.updateUser(user,updatedUser);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("User" + user.getUsername() + "is not found", e.getMessage());
        }
    }

    // --------------------------------------- DELETE USER --------------------------------------
    @Test
    void deleteUser_shouldDeleteUser_whenCalledWithValidUser() throws UsernameNotFoundException {
        // GIVEN
        AppUserService appUserService = new AppUserService(appUserRepo, exerciseRepo, workoutRepo, passwordEncoder, idService);
        User user = new User("testUser", "testPassword", Collections.emptyList());

        when(appUserRepo.findByUsername(user.getUsername())).thenReturn(Optional.ofNullable(AppUser.builder().build()));

        // WHEN
        appUserService.deleteUser(user);

        // THEN
        verify(appUserRepo).delete(any());
        verify(exerciseRepo).deleteAllById(any());
        verify(workoutRepo).deleteAllById(any());
    }

    @Test
    void deleteUser_shouldThrowException_whenCalledWithInvalidUser() throws UsernameNotFoundException {
        // GIVEN
        AppUserService appUserService = new AppUserService(appUserRepo, exerciseRepo, workoutRepo, passwordEncoder, idService);
        User user = new User("testUser", "testPassword", Collections.emptyList());

        when(appUserRepo.findByUsername(user.getUsername())).thenReturn(Optional.empty());

        // WHEN & THEN
        try {
            appUserService.deleteUser(user);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("User" + user.getUsername() + "is not found", e.getMessage());
        }
    }
}