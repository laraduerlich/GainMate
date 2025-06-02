package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.exception.NotExistsException;
import com.example.backend.model.Exercise;
import com.example.backend.model.ExerciseDTO;
import com.example.backend.model.Progress;
import com.example.backend.repo.ExerciseRepo;
import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDTO;
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
        AppUser appUser = appUserService.findByUsername(user.getUsername());
        List<Exercise> all = exerciseRepo.findAll();
        return all.stream()
                .filter(exercise -> appUser.exerciseIdList().contains(exercise.id()))
                .collect(Collectors.toList());
    }

    public Exercise getExerciseById(String id) throws NotExistsException {
        return exerciseRepo.findById(id)
                .orElseThrow(() -> new NotExistsException("Exercise with id " + id + " does not exist"));

    }

    public Exercise createExercise(ExerciseDTO exerciseDTO, User user) throws AlreadyExistsException, UsernameNotFoundException {
        // Filter exercises assigned to the user
        AppUser appUser = appUserService.findByUsername(user.getUsername());
        List<Exercise> filteredExercisesByUser = exerciseRepo.findAllById(appUser.exerciseIdList());

        boolean exists = filteredExercisesByUser.stream()
                .anyMatch(exercise -> exercise.name().equals(exerciseDTO.name()));

        // Check if the name is already in the repo
        if (exists) {
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
            AppUserDTO updatedUser = AppUserDTO.builder()
                    .username(appUser.username())
                    .password(appUser.password())
                    .name(appUser.name())
                    .exerciseIdList(appUser.exerciseIdList())
                    .workoutIdList(appUser.workoutIdList())
                    .build();
            updatedUser.exerciseIdList().add(newExercise.id());
            appUserService.updateUser(user, updatedUser);

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
            AppUser appUser = appUserService.findByUsername(user.getUsername());
            AppUserDTO updatedUser = AppUserDTO.builder()
                    .username(appUser.username())
                    .password(appUser.password())
                    .name(appUser.name())
                    .exerciseIdList(appUser.exerciseIdList())
                    .workoutIdList(appUser.workoutIdList())
                    .build();
                updatedUser.exerciseIdList().remove(id);
                appUserService.updateUser(user, updatedUser);
        } else {
            throw new NotExistsException("Exercise with id " + id + " does not exist");
        }
    }
}
