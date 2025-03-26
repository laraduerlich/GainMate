package com.example.backend.service;

import com.example.backend.exception.ExerciseAlreadyExistsException;
import com.example.backend.exception.ExerciseNotExistsException;
import com.example.backend.model.Exercise;
import com.example.backend.model.ExerciseDTO;
import com.example.backend.repo.ExerciseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepo exerciseRepo;
    private final IdService idService;

    public List<Exercise> getAllExercises() {
        return exerciseRepo.findAll();
    }

    public Exercise getExerciseById(String id) throws ExerciseNotExistsException {
        return exerciseRepo.findById(id)
                .orElseThrow(() -> new ExerciseNotExistsException("Exercise with id " + id + " does not exist"));

    }

    public Exercise createExercise(ExerciseDTO newExercise) throws ExerciseAlreadyExistsException {
       // Check if the name is already in the repo
        if (exerciseRepo.existsByName(newExercise.name())) {
            throw new ExerciseAlreadyExistsException("Exercise already exists!");
        } else {
            Exercise exercise = Exercise.builder()
                    .id(idService.generateId())
                    .name(newExercise.name())
                    .note(newExercise.note())
                    .build();
            exerciseRepo.save(exercise);
            return exercise;
        }
    }

    public Exercise updateExercise(String id, Exercise newExercise) throws ExerciseNotExistsException {
        // Check if the name is already in the repo
        if (exerciseRepo.existsById(id)) {
            return exerciseRepo.save(newExercise);
        } else {
            throw new ExerciseNotExistsException("Exercise with id " + id + " does not exist");
        }
    }
}
