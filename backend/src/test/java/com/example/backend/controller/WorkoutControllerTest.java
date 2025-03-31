package com.example.backend.controller;

import com.example.backend.model.Workout;
import com.example.backend.repo.WorkoutRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD) // Spring ApplicationContext is reloaded before each test method
@AutoConfigureMockMvc
class WorkoutControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WorkoutRepo repo;

    // --------------------------------------- GET ALL --------------------------------------
    @Test
    void getAllWorkouts_shouldReturnEmptyList_whenCalledInitially() throws Exception {
        // WHEN & THEN
        mockMvc.perform(get("/api/workout/all"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    // --------------------------------------- GET BY ID -------------------------------------
    @Test
    void getWorkoutById_shouldReturnWorkout_whenCalledWithValidId() throws Exception {
        // GIVEN
        Workout workout = Workout.builder()
                .id("1")
                .name("Test")
                .build();
        repo.save(workout);

        // WHEN & THEN
        mockMvc.perform(get("/api/workout/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                          id: "1",
                          name: "Test"
                        }
                        """));
    }

    @Test
    void getWorkoutById_shouldThrowException_whenCalledWithInvalidId() throws Exception {
        mockMvc.perform(get("/api/workout/1"))
                .andExpect(status().isNotFound());
    }

    // --------------------------------------- POST ----------------------------------------
    @Test
    void createWorkout_shouldReturnWorkout_WhenCalledWithDTO() throws Exception {
        // WHEN & THEN
        mockMvc.perform(post("/api/workout/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "name": "test",
                        "exerciseIdList": ["1", "2", "3"]
                        }
"""
                ))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "name": "test",
                        "exerciseIdList": ["1", "2", "3"]
                        }
                        """));
    }

    // --------------------------------------- PUT ----------------------------------------
    @Test
    void updateWorkout_shouldReturnWorkout_WhenCalledWithValidId() throws Exception {
        // GIVEN
        Workout workout = Workout.builder()
                .id("1")
                .name("Test")
                .build();
        repo.save(workout);

        // WHEN & THEN
        mockMvc.perform(put("/api/workout/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "id": "1",
                        "name": "Test2"
                        }
"""
                ))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                          id: "1",
                          "name": "Test2"
                        }
                        """));
    }

    @Test
    void updateWorkout_shouldThrowException_whenCalledWithInvalidId() throws Exception {
        mockMvc.perform(put("/api/workout/1")
        .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "id": "1",
                          "name": "Test2"
                        }
"""
                ))
                .andExpect(status().isNotFound());
    }

    // --------------------------------------- DELETE ----------------------------------------
    @Test
    void deleteWorkout_shouldReturnWorkout_WhenCalledWithValidId() throws Exception {
        // GIVEN
        Workout workout = Workout.builder()
                .id("1")
                .name("test")
                .build();
        repo.save(workout);

        // WHEN & THEN
        mockMvc.perform(delete("/api/workout/1"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteWorkout_shouldThrowException_whenCalledWithInvalidId() throws Exception {
        mockMvc.perform(delete("/api/workout/1"))
                .andExpect(status().isNotFound());
    }
}
