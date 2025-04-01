package com.example.backend.model;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ExerciseTest {

    @Test
    void testExerciseCreation() {
        // Creating Sets
        Sets set1 = new Sets("10", "50kg");
        Sets set2 = new Sets("12", "55kg");
        List<Sets> setsList = List.of(set1, set2);

        // Creating Progress
        Progress progress1 = new Progress("2024-03-20", setsList);
        Progress progress2 = new Progress("2024-03-21", List.of(set1));
        List<Progress> progressList = List.of(progress1, progress2);

        // Creating Exercise
        Exercise exercise = new Exercise("123", "Bench Press", "Strength training", progressList);

        // Assertions
        assertNotNull(exercise);
        assertEquals("123", exercise.id());
        assertEquals("Bench Press", exercise.name());
        assertEquals("Strength training", exercise.note());
        assertEquals(2, exercise.progressList().size());

        // Assertions for Progress
        assertEquals("2024-03-20", exercise.progressList().get(0).date());
        assertEquals(2, exercise.progressList().get(0).sets().size());

        // Assertions for Sets
        assertEquals("10", exercise.progressList().get(0).sets().get(0).repetition());
        assertEquals("50kg", exercise.progressList().get(0).sets().get(0).weight());
    }

    @Test
    void testExerciseWithEmptyProgressList() {
        Exercise exercise = new Exercise("456", "Squats", "Leg day", List.of());

        assertNotNull(exercise);
        assertEquals("456", exercise.id());
        assertEquals("Squats", exercise.name());
        assertEquals("Leg day", exercise.note());
        assertTrue(exercise.progressList().isEmpty());
    }

    @Test
    void testProgressWithEmptySetsList() {
        Progress progress = new Progress("2024-03-20", List.of());

        assertNotNull(progress);
        assertEquals("2024-03-20", progress.date());
        assertTrue(progress.sets().isEmpty());
    }

    @Test
    void testSetsCreation() {
        Sets set = new Sets("10", "50kg");

        assertNotNull(set);
        assertEquals("10", set.repetition());
        assertEquals("50kg", set.weight());
    }
}
