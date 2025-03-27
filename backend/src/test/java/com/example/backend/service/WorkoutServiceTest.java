package com.example.backend.service;

import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.repo.WorkoutRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class WorkoutServiceTest {

    private final WorkoutRepo workoutRepo = mock(WorkoutRepo.class);
    private final IdService idService = mock(IdService.class);

    // --------------------------------------- GET ALL --------------------------------------
    @Test
    void getAllWorkouts_shouldReturnEmptyList_whenCalledInitally() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        List<Workout> expected = Collections.emptyList();

        // WHEN
        List<Workout> actual = workoutService.getAllWorkouts();

        // THEN
        assertEquals(expected, actual);
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
}
