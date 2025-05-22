package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.exception.NotExistsException;
import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.repo.WorkoutRepo;
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
public class WorkoutService {

    private final WorkoutRepo workoutRepo;
    private final IdService idService;
    private final AppUserService appUserService;

    public List<Workout> getAllWorkouts(User user) throws UsernameNotFoundException {
        AppUserResponse appUserResponse = appUserService.findByUsername(user.getUsername());
        List<Workout> all = workoutRepo.findAll();
        return all.stream()
                .filter(workout -> appUserResponse.workoutIdList().contains(workout.id()))
                .collect(Collectors.toList());
    }

    public Workout getWorkoutById(String id) throws NotExistsException {
        return workoutRepo.findById(id)
                .orElseThrow(() -> new NotExistsException("Workout with id " + id + " does not exist"));
    }

    public Workout createWorkout(WorkoutDTO workoutDTO, User user) throws AlreadyExistsException, UsernameNotFoundException {
        // Check if the name is already in the repo
        if (workoutRepo.existsByName(workoutDTO.name())) {
            throw new AlreadyExistsException("Workout already exists");
        } else {
            // Save new workout
            Workout newWorkout = Workout.builder()
                    .id(idService.generateId())
                    .name(workoutDTO.name())
                    .exerciseIdList(workoutDTO.exerciseIdList())
                    .dateList(new ArrayList<>())
                    .build();
            workoutRepo.save(newWorkout);
            // Update user with new workout ID
            AppUserResponse appUserResponse = appUserService.findByUsername(user.getUsername());
            appUserResponse.workoutIdList().add(newWorkout.id());
            appUserService.updateUser(appUserResponse);

            return newWorkout;
        }
    }

    public Workout updateWorkout(String id, WorkoutDTO workoutDTO) throws NotExistsException {
        // Check if the name is already in the repo
        if (workoutRepo.existsById(id)) {
            Workout updatedWorkout = Workout.builder()
                    .id(id)
                    .name(workoutDTO.name())
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
            AppUserResponse appUserResponse = appUserService.findByUsername(user.getUsername());
            appUserResponse.workoutIdList().remove(id);
            appUserService.updateUser(appUserResponse);
        } else {
            throw new NotExistsException("Workout with id " + id + " does not exist");
        }
    }
}
