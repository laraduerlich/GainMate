package com.example.backend.controller;

import com.example.backend.model.Exercise;
import com.example.backend.model.Workout;
import com.example.backend.repo.AppUserRepo;
import com.example.backend.repo.ExerciseRepo;
import com.example.backend.repo.WorkoutRepo;
import com.example.backend.security.model.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD) // Spring ApplicationContext is reloaded before each test method
@AutoConfigureMockMvc
class AppUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AppUserRepo userRepo;

    @Autowired
    private ExerciseRepo exerciseRepo;

    @Autowired
    private WorkoutRepo workoutRepo;
    @Autowired
    private AppUserRepo appUserRepo;

    // --------------------------------------- REGISTER ---------------------------------------
    @Test
    @WithMockUser
    void registerUser_shouldReturnUserDto() throws Exception {
        // GIVEN
        String username = "testuser";

        // WHEN & THEN
        mockMvc.perform(post("/api/account/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                        "username": "testuser",
                        "password": "testpassword",
                        "name": "test"
                        }
"""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("test"));
    }

    @Test
    @WithMockUser
    void registerUser_shouldThrowException_whenUsernameIsAlreadyUsed() throws Exception {
        // GIVEN
        String username = "testuser";
        appUserRepo.save(AppUser.builder().name("test").username(username).build());

        // WHEN & THEN
        mockMvc.perform(post("/api/account/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                        "username": "testuser",
                        "password": "testpassword",
                        "name": "test"
                        }
"""))
                .andExpect(status().isBadRequest());
    }

    // --------------------------------------- UPDATE ---------------------------------------
    @Test
    @WithMockUser
    void updateUser_shouldUpdateUser_whenCalledWithValidUser() throws Exception {
        // GIVEN
        AppUser appUser = AppUser.builder().username("testUser").build();
        User user = new User("testUser", "testPassword", Collections.emptyList());
        userRepo.save(appUser);

        // WHEN & THEN
        mockMvc.perform(put("/api/account/update")
                .with(user(user.getUsername()))
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "username": "testUser2",
                        "password": "testpassword",
                        "name": "test"
                        }
"""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testUser2"));

    }


    // --------------------------------------- DELETE ---------------------------------------
    @Test
    @WithMockUser
    void deleteUser_shouldDeleteUser_whenCalledWithValidUser() throws Exception {
        // GIVEN
        User user = new User("testUser", "testPassword", Collections.emptyList());
        AppUser appUser = AppUser.builder().username("testUser").exerciseIdList(List.of("1")).workoutIdList(List.of("1")).build();
        userRepo.save(appUser);
        exerciseRepo.save(Exercise.builder().id("1").build());
        workoutRepo.save(Workout.builder().id("1").build());

        // WHEN & WHEN
        mockMvc.perform(delete("/api/account")
                .with(user(user.getUsername())))
                .andExpect(status().isOk());
    }

    @Test
    void deleteUser_shouldThrowException_whenUserIsNotFound () throws Exception {
        // GIVEN
        User user = new User("testUser", "testPassword", Collections.emptyList());

        mockMvc.perform(delete("/api/account")
                .with(user(user.getUsername())))
                .andExpect(status().isNotFound());
    }
}
