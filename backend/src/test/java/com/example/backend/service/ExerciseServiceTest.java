package com.example.backend.service;

import com.example.backend.model.Exercise;
import com.example.backend.model.ExerciseDTO;
import com.example.backend.repo.ExerciseRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ExerciseServiceTest {

    private final ExerciseRepo exerciseRepo = mock(ExerciseRepo.class);
    private final IdService idService = mock(IdService.class);

    // --------------------------------------- GET ALL ---------------------------------------

    @Test
    void getAllExercises_shouldReturnEmptyList_whenCalled() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        List<Exercise> expected = Collections.emptyList();

        // WHEN
        List<Exercise> actual = exerciseService.getAllExercises();

        // THEN
        assertEquals(expected, actual);
    }

    // --------------------------------------- CREATE ---------------------------------------

    @Test
    void createExercise_shouldCreateExercise_whenCalled() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        ExerciseDTO newExercise = new ExerciseDTO("Test", "Test");
        Exercise expected = Exercise.builder()
                .id("1")
                .name("Test")
                .note("Test")
                .build();
        when(idService.generateId()).thenReturn("1");
        when(exerciseRepo.save(expected)).thenReturn(expected);

        // WHEN
        Exercise actual = exerciseService.createExercise(newExercise);

        // THEN
        assertEquals(expected, actual);
    }

    @Test
    void createExercise_shouldThrowException_whenExerciseAlreadyExists() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        ExerciseDTO newExercise = new ExerciseDTO("Test", "Test");
        when(exerciseRepo.existsByName("Test")).thenReturn(true);

        // WHEN & THEN
        try {
            exerciseService.createExercise(newExercise);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Exercise already exists!", e.getMessage());
        }
    }
}
