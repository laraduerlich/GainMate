package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.exception.NotExistsException;
import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.model.WorkoutIcon;
import com.example.backend.repo.WorkoutRepo;
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
public class WorkoutService {

    private final WorkoutRepo workoutRepo;
    private final IdService idService;
    private final AppUserService appUserService;

    public List<Workout> getAllWorkouts(User user) throws UsernameNotFoundException {
        AppUser appUser = appUserService.findByUsername(user.getUsername());
        List<Workout> all = workoutRepo.findAll();
        return all.stream()
                .filter(workout -> appUser.workoutIdList().contains(workout.id()))
                .collect(Collectors.toList());
    }

    public Workout getWorkoutById(String id) throws NotExistsException {
        return workoutRepo.findById(id)
                .orElseThrow(() -> new NotExistsException("Workout with id " + id + " does not exist"));
    }

    public Workout createWorkout(WorkoutDTO workoutDTO, User user) throws AlreadyExistsException, UsernameNotFoundException {
        // Filter workouts assigned to the user
        AppUser appUser = appUserService.findByUsername(user.getUsername());
        List<Workout> filteredWorkoutsByUser = workoutRepo.findAllById(appUser.workoutIdList());

        boolean exists = filteredWorkoutsByUser.stream()
                .anyMatch(workout -> workout.name().equals(workoutDTO.name()));

        // Check if the name is already in the repo
        if (exists) {
            throw new AlreadyExistsException("Workout already exists");
        } else {
            // Save new workout
            Workout newWorkout = Workout.builder()
                    .id(idService.generateId())
                    .name(workoutDTO.name())
                    .icon(WorkoutIcon.ARMS) // set to ARMS to save in the repo for future feature
                    .exerciseIdList(workoutDTO.exerciseIdList())
                    .dateList(new ArrayList<>())
                    .build();
            workoutRepo.save(newWorkout);
            // Update user with new workout ID
            AppUserDTO updatedUser = AppUserDTO.builder()
                    .username(appUser.username())
                    .password(appUser.password())
                    .name(appUser.name())
                    .exerciseIdList(appUser.exerciseIdList())
                    .workoutIdList(appUser.workoutIdList())
                    .build();
            updatedUser.workoutIdList().add(newWorkout.id());
            appUserService.updateUser(user, updatedUser);

            return newWorkout;
        }
    }

    public Workout updateWorkout(String id, WorkoutDTO workoutDTO) throws NotExistsException {
        // Check if the name is already in the repo
        if (workoutRepo.existsById(id)) {
            Workout updatedWorkout = Workout.builder()
                    .id(id)
                    .name(workoutDTO.name())
                    .icon(workoutDTO.icon())
                    .exerciseIdList(workoutDTO.exerciseIdList())
                    .dateList(workoutDTO.dateList())
                    .build();
            return workoutRepo.save(updatedWorkout);

        } else {
            throw new NotExistsException("Workout with id " + id + " does not exist");
        }
    }

    public void deleteWorkout(String id, User user) throws NotExistsException, UsernameNotFoundException {
        if (workoutRepo.existsById(id)) {
            workoutRepo.deleteById(id);
            // Update user
            AppUser appUser = appUserService.findByUsername(user.getUsername());
            AppUserDTO updatedUser = AppUserDTO.builder()
                    .username(appUser.username())
                    .password(appUser.password())
                    .name(appUser.name())
                    .exerciseIdList(appUser.exerciseIdList())
                    .workoutIdList(appUser.workoutIdList())
                    .build();
            updatedUser.workoutIdList().remove(id);
            appUserService.updateUser(user, updatedUser);
        } else {
            throw new NotExistsException("Workout with id " + id + " does not exist");
        }
    }
}
