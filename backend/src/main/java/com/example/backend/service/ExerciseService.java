package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.exception.NotExistsException;
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

    public Exercise getExerciseById(String id) throws NotExistsException {
        return exerciseRepo.findById(id)
                .orElseThrow(() -> new NotExistsException("Exercise with id " + id + " does not exist"));

    }

    public Exercise createExercise(ExerciseDTO newExercise) throws AlreadyExistsException {
       // Check if the name is already in the repo
        if (exerciseRepo.existsByName(newExercise.name())) {
            throw new AlreadyExistsException("Exercise already exists!");
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

    public Exercise updateExercise(String id, ExerciseDTO newExercise) throws NotExistsException {
        // Check if the name is already in the repo
        if (exerciseRepo.existsById(id)) {
            Exercise exercise = Exercise.builder()
                    .name(newExercise.name())
                    .note(newExercise.note())
                    .build();
            return exerciseRepo.save(exercise);
        } else {
            throw new NotExistsException("Exercise with id " + id + " does not exist");
        }
    }
}
