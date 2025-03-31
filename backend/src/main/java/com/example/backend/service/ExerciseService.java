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

    public Exercise createExercise(ExerciseDTO exerciseDTO) throws AlreadyExistsException {
       // Check if the name is already in the repo
        if (exerciseRepo.existsByName(exerciseDTO.name())) {
            throw new AlreadyExistsException("Exercise already exists!");
        } else {
            Exercise newExercise = Exercise.builder()
                    .id(idService.generateId())
                    .name(exerciseDTO.name())
                    .note(exerciseDTO.note())
                    .build();
            exerciseRepo.save(newExercise);
            return newExercise;
        }
    }

    public Exercise updateExercise(String id, ExerciseDTO exerciseDTO) throws NotExistsException {
        // Check if the name is already in the repo
        if (exerciseRepo.existsById(id)) {
            Exercise updatedExercise = Exercise.builder()
                    .id(id)
                    .name(exerciseDTO.name())
                    .note(exerciseDTO.note())
                    .build();
            return exerciseRepo.save(updatedExercise);
        } else {
            throw new NotExistsException("Exercise with id " + id + " does not exist");
        }
    }

    public void deleteExercise(String id) throws NotExistsException {
        // Check if the id is  in the repo
        if (exerciseRepo.existsById(id)) {
            exerciseRepo.deleteById(id);
        } else {
            throw new NotExistsException("Exercise with id " + id + " does not exist");
        }
    }
}
