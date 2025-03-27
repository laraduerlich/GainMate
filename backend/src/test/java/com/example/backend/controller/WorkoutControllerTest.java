package com.example.backend.controller;

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
    private WorkoutRepo workoutRepo;

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

}
