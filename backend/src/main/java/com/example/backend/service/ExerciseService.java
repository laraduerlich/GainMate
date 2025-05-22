package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.exception.NotExistsException;
import com.example.backend.model.Exercise;
import com.example.backend.model.ExerciseDTO;
import com.example.backend.model.Progress;
import com.example.backend.repo.ExerciseRepo;
import com.example.backend.security.AppUserService;
import com.example.backend.security.model.AppUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepo exerciseRepo;
    private final IdService idService;
    private final AppUserService appUserService;

    public List<Exercise> getAllExercises(User user) throws UsernameNotFoundException {
        AppUserResponse appUserResponse = appUserService.findByUsername(user.getUsername());
        List<Exercise> all = exerciseRepo.findAll();
        return all.stream()
                .filter(exercise -> appUserResponse.exerciseIdList().contains(exercise.id()))
                .collect(Collectors.toList());
    }

    public Exercise getExerciseById(String id) throws NotExistsException {
        return exerciseRepo.findById(id)
                .orElseThrow(() -> new NotExistsException("Exercise with id " + id + " does not exist"));

    }

    public Exercise createExercise(ExerciseDTO exerciseDTO, User user) throws AlreadyExistsException, UsernameNotFoundException {
       // Check if the name is already in the repo
        if (exerciseRepo.existsByName(exerciseDTO.name())) {
            throw new AlreadyExistsException("Exercise already exists!");
        } else {
            // Save new exercise
            Exercise newExercise = Exercise.builder()
                    .id(idService.generateId())
                    .name(exerciseDTO.name())
                    .note(exerciseDTO.note())
                    .build();
            exerciseRepo.save(newExercise);
            // Update user with the new exercise ID
            AppUserResponse appUserResponse = appUserService.findByUsername(user.getUsername());
            appUserResponse.exerciseIdList().add(newExercise.id());
            appUserService.updateUser(appUserResponse);

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
        // null Check
        if (progressList == null) {
            return new ArrayList<>();
        }
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

    public void deleteExercise(String id, User user) throws NotExistsException, UsernameNotFoundException {
        // Check if the id is  in the repo
        if (exerciseRepo.existsById(id)) {
            exerciseRepo.deleteById(id);
            // Update user
            AppUserResponse appUserResponse = appUserService.findByUsername(user.getUsername());
            appUserResponse.exerciseIdList().remove(id);
            appUserService.updateUser(appUserResponse);
        } else {
            throw new NotExistsException("Exercise with id " + id + " does not exist");
        }
    }
}
