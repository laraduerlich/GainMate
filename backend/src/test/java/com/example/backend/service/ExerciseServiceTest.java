package com.example.backend.service;

import com.example.backend.model.Exercise;
import com.example.backend.repo.ExerciseRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class ExerciseServiceTest {

    private ExerciseRepo exerciseRepo = mock(ExerciseRepo.class);
    private IdService idService = mock(IdService.class);

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

}
