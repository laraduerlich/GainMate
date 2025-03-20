package com.example.backend.service;

import com.example.backend.exception.NotFoundAllExercises;
import com.example.backend.model.Exercise;
import com.example.backend.repo.ExerciseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepo exerciseRepo;

    public List<Exercise> getAllExercises() throws NotFoundAllExercises {
        return exerciseRepo.findAll();
    }
}
