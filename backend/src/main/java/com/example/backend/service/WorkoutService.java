package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.repo.WorkoutRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkoutService {

    private final WorkoutRepo workoutRepo;
    private final IdService idService;

    public Workout createWorkout(WorkoutDTO workout) {
        if (workoutRepo.existsByName(workout.name())) {
            throw new AlreadyExistsException(workout.name() + " already exists");
        } else {
            Workout newWorkout = Workout.builder()
                    .id(idService.generateId())
                    .name(workout.name())
                    .exerciseIdList(workout.exerciseIdList())
                    .build();
            return workoutRepo.save(newWorkout);
        }
    }
}
