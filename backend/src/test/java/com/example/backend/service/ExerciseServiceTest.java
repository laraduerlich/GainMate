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

    // --------------------------------------- GET ALL --------------------------------------

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

    // --------------------------------------- GET BY ID ------------------------------------
    @Test
    void getExerciseById_shouldReturnExercise_whenCalledWithValidId() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        String id = "1";
        Exercise expected = Exercise.builder()
                .id("1")
                .name("Test")
                .note("Test")
                .build();
        when(exerciseRepo.existsById(id)).thenReturn(true);
        when(exerciseRepo.findById(id)).thenReturn(Optional.of(expected));

        // WHEN
        Exercise actual = exerciseService.getExerciseById(id);

        // THEN
        assertEquals(expected, actual);
    }

    @Test
    void getExerciseById_ShouldThrowException_whenExerciseNotFound() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        String id = "1";

        // WHEN & THEN
        try {
            exerciseService.getExerciseById(id);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Exercise with id " + id + " does not exist", e.getMessage());
        }
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

    // --------------------------------------- UPDATE --------------------------------------
    @Test
    void updateExercise_shouldUpdateExercise_whenCalledWithValidId() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        Exercise updatedExercise = Exercise.builder()
                .id("1")
                .name("Test")
                .note("Test")
                .build();
        when(exerciseRepo.existsById(updatedExercise.id())).thenReturn(true);
        when(exerciseRepo.save(updatedExercise)).thenReturn(updatedExercise);

        // WHEN
        Exercise actual = exerciseService.updateExercise(updatedExercise.id(), updatedExercise);

        // THEN
        assertEquals(updatedExercise, actual);
    }

    @Test
    void updateExercise_shouldThrowException_whenExerciseNotFound() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        Exercise updatedExercise = Exercise.builder()
                .id("1")
                .name("Test")
                .note("Test")
                .build();
        when(exerciseRepo.existsById(updatedExercise.id())).thenReturn(false);

        // WHEN & THEN
        try {
            exerciseService.updateExercise(updatedExercise.id(), updatedExercise);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Exercise with id " + updatedExercise.id() + " does not exist", e.getMessage());
        }
    }

}
