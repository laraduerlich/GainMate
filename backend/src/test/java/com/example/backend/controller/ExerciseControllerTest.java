package com.example.backend.controller;

import com.example.backend.repo.ExerciseRepo;
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
class ExerciseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ExerciseRepo repo;

    // --------------------------------------- GET ALL ---------------------------------------
    @Test
    void getAllExcercises_shouldReturnEmptyList_whenCalledInitially () throws Exception {
       // WHEN & THEN
       mockMvc.perform(get("/api/exercise/all"))
               .andExpect(status().isOk())
               .andExpect(content().json("[]"));
   }

   // --------------------------------------- CREATE ---------------------------------------
    @Test
    void createExercise_shouldReturnExcercise_whenCalledWithDTO () throws Exception {
       // WHEN & THEN
       mockMvc.perform(post("/api/exercise/new")
                       .contentType(MediaType.APPLICATION_JSON)
                       .content("""
                               {
                                   "name": "Push-Test",
                                   "note": "Do 3 sets of 15 reps"
                               }
"""
                       ))
               .andExpect(status().isOk())
               .andExpect(content().json("""
                       {
                           "name": "Push-Test",
                           "note": "Do 3 sets of 15 reps",
                           "progressList": null
                       }
"""));
   }
}
