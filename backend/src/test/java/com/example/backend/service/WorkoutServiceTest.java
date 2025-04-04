package com.example.backend.service;

import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.repo.WorkoutRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WorkoutServiceTest {

    private final WorkoutRepo workoutRepo = mock(WorkoutRepo.class);
    private final IdService idService = mock(IdService.class);

    // --------------------------------------- GET ALL --------------------------------------
    @Test
    void getAllWorkouts_shouldReturnEmptyList_whenCalledInitially() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        List<Workout> expected = Collections.emptyList();

        // WHEN
        List<Workout> actual = workoutService.getAllWorkouts();

        // THEN
        assertEquals(expected, actual);
    }

    // --------------------------------------- GET BY ID ------------------------------------
    @Test
    void getWorkoutById_shouldReturnWorkout_whenCalledWithValidId() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        String id = "1";
        Workout expected = Workout.builder()
                .id("1")
                .name("Test")
                .build();
        when(workoutRepo.findById(id)).thenReturn(Optional.of(expected));

        // WHEN
        Workout actual = workoutService.getWorkoutById(id);

        // THEN
        assertEquals(expected, actual);
    }

    @Test
    void getWorkoutById_shouldThrowException_whenCalledWithInvalidId() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        String id = "2";

        // WHEN & THEN
        try {
            workoutService.getWorkoutById(id);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Workout with id 2 does not exist", e.getMessage());
        }
    }

    // --------------------------------------- CREATE ---------------------------------------
    @Test
    void createWorkout_shouldReturnWorkout_whenCalledWithDTO() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        WorkoutDTO workout = new WorkoutDTO("Test", List.of("1", "2", "3"));
        Workout expected = Workout.builder()
                .id("1")
                .name("Test")
                .exerciseIdList(List.of("1", "2", "3"))
                .build();
        when(idService.generateId()).thenReturn("1");
        when(workoutRepo.save(expected)).thenReturn(expected);

        // WHEN
        Workout actual = workoutService.createWorkout(workout);
        assertEquals(expected, actual);
    }

    @Test
    void createWorkout_shouldThrowException_whenWorkoutAlreadyExists() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        WorkoutDTO workout = new WorkoutDTO("Test", List.of("1", "2", "3"));
        when(workoutRepo.existsByName("Test")).thenReturn(true);

        // WHEN & THEN
        try {
            workoutService.createWorkout(workout);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Workout already exists", e.getMessage());
        }
    }

    // --------------------------------------- UPDATE --------------------------------------
    @Test
    void updateWorkout_shouldUpdateWorkout_whenCalledWithValidId() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        WorkoutDTO updatedWorkout = new WorkoutDTO("Test1", List.of("1", "2", "3"));
        Workout expected = Workout.builder()
                .id("1")
                .name("Test1")
                .exerciseIdList(List.of("1", "2", "3"))
                .build();
        when(workoutRepo.existsById("1")).thenReturn(true);
        when(workoutRepo.save(expected)).thenReturn(expected);

        // WHEN
        Workout actual = workoutService.updateWorkout("1", updatedWorkout);

        // THEN
        assertEquals(expected, actual);
    }

    @Test
    void updateWorkout_shouldThrowException_whenWorkoutAlreadyExists() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        WorkoutDTO updatedWorkout = new WorkoutDTO("Test1", List.of("1", "2", "3"));

        when(workoutRepo.existsById("1")).thenReturn(false);

        // WHEN & THEN
        try {
            workoutService.updateWorkout("1", updatedWorkout);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Workout with id 1 does not exist", e.getMessage());
        }

    }

    // --------------------------------------- DELETE --------------------------------------
    @Test
    void deleteWorkout_shouldDeleteWorkout_whenCalledWithValidId() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        Workout workout = Workout.builder()
                .id("1")
                .name("Test")
                .build();
        when(workoutRepo.existsById("1")).thenReturn(true);

        // WHEN
        workoutService.deleteWorkout("1");

        // THEN
        verify(workoutRepo, times(1)).deleteById(anyString());
    }

    @Test
    void deleteWorkout_shouldThrowException_whenWorkoutDoesNotExist() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        String id = "2";

        when(workoutRepo.existsById(id)).thenReturn(false);

        // WHEN & THEN
        try {
            workoutService.deleteWorkout(id);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Workout with id 2 does not exist", e.getMessage());
        }
    }


}
