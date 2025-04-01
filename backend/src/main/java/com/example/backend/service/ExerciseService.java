package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.exception.NotExistsException;
import com.example.backend.model.Exercise;
import com.example.backend.model.ExerciseDTO;
import com.example.backend.model.Progress;
import com.example.backend.repo.ExerciseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

            List<Progress> clean = mergeDuplicateProgressEntries(exerciseDTO.progressList());

            Exercise updatedExercise = Exercise.builder()
                    .id(id)
                    .name(exerciseDTO.name())
                    .note(exerciseDTO.note())
                    .progressList(clean)
                    .build();
            return exerciseRepo.save(updatedExercise);
        } else {
            throw new NotExistsException("Exercise with id " + id + " does not exist");
        }
    }

    // method to clean the progress List
    public static List<Progress> mergeDuplicateProgressEntries(List<Progress> progressList) {
        return new ArrayList<>(progressList.stream() // // Convert list to a Stream
                .collect(Collectors.toMap(
                        Progress::date, // Group by `date` as the key
                        p -> new Progress(p.date(), new ArrayList<>(p.sets())), // Copy `sets` to a new Progress entry
                        (existing, duplicate) -> { // If a duplicate date exists:
                            existing.sets().addAll(duplicate.sets()); // Merge the `sets` lists
                            return existing; // Return the updated entry
                        }
                ))
                .values()); // Convert map values back to a list
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
