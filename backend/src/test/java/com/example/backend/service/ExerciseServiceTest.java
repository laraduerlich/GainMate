package com.example.backend.service;

import com.example.backend.model.Exercise;
import com.example.backend.model.ExerciseDTO;
import com.example.backend.model.Progress;
import com.example.backend.model.Sets;
import com.example.backend.repo.ExerciseRepo;
import com.example.backend.security.model.AppUserDTO;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
        List<Exercise> actual = exerciseService.getAllExercises(AppUserDTO.builder().build());

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
        ExerciseDTO newExercise = ExerciseDTO.builder()
                .name("Test")
                .note("Test")
                .build();
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
        ExerciseDTO newExercise = ExerciseDTO.builder()
                .name("Test")
                .note("Test")
                .build();
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
        ExerciseDTO updatedExercise = ExerciseDTO.builder()
                .name("Test")
                .note("Test")
                .progressList(Collections.emptyList())
                .build();
        Exercise expected = Exercise.builder()
                .id("1")
                .name("Test")
                .note("Test")
                .progressList(Collections.emptyList())
                .build();
        when(exerciseRepo.existsById(expected.id())).thenReturn(true);
        when(exerciseRepo.save(expected)).thenReturn(expected);

        // WHEN
        Exercise actual = exerciseService.updateExercise(expected.id(), updatedExercise);

        // THEN
        assertEquals(expected, actual);
    }

    @Test
    void updateExercise_shouldThrowException_whenExerciseNotFound() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        ExerciseDTO updatedExercise = ExerciseDTO.builder()
                .name("Test")
                .note("Test")
                .build();
        when(exerciseRepo.existsById("1")).thenReturn(false);

        // WHEN & THEN
        try {
            exerciseService.updateExercise("1", updatedExercise);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Exercise with id " + "1" + " does not exist", e.getMessage());
        }
    }

    // ------------------------------------ CLEAN PROGRESS ----------------------------------
    @Test
    void mergeDuplicateProgressEntries_shouldCleanProgressEntries_whenCalled() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        List<Sets> sets1 = new ArrayList<>(Arrays.asList(new Sets("10 reps", "50kg"), new Sets("12 reps", "55kg")));
        List<Sets> sets2 = new ArrayList<>(Collections.singletonList(new Sets("8 reps", "60kg")));
        List<Sets> sets3 = new ArrayList<>(Collections.singletonList(new Sets("15 reps", "40kg")));

        Progress p1 = new Progress("2024-03-01", sets1);
        Progress p2 = new Progress("2024-03-01", sets2);
        Progress p3 = new Progress("2024-03-02", sets3);
        List<Progress> inputList = Arrays.asList(p1, p2, p3);

        // WHEN
        List<Progress> result = exerciseService.mergeDuplicateProgressEntries(inputList);

        // THEN
        assertEquals(2, result.size());
    }


    // --------------------------------------- DELETE --------------------------------------
    @Test
    void deleteExercise_shouldDeleteExercise_whenCalledWithValidId() {
        // GIVEN
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        Exercise deletedExercise = Exercise.builder().id("1").build();

        when(exerciseRepo.existsById(deletedExercise.id())).thenReturn(true);

        // WHEN
        exerciseService.deleteExercise(deletedExercise.id());

        // THEN
        verify(exerciseRepo).deleteById(deletedExercise.id());
    }

    @Test
    void deleteExercise_shouldThrowException_whenExerciseNotFound() {
        ExerciseService exerciseService = new ExerciseService(exerciseRepo, idService);
        String id = "1";

        when(exerciseRepo.existsById(id)).thenReturn(false);

        // WHEN & THEN
        try {
            exerciseService.deleteExercise(id);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Exercise with id " + id + " does not exist", e.getMessage());
        }
    }
}
