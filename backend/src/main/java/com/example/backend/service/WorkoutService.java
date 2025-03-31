package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.exception.NotExistsException;
import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.repo.WorkoutRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {

    private final WorkoutRepo workoutRepo;
    private final IdService idService;

    public List<Workout> getAllWorkouts() {
        return workoutRepo.findAll();
    }

    public Workout getWorkoutById(String id) throws NotExistsException {
        return workoutRepo.findById(id)
                .orElseThrow(() -> new NotExistsException("Workout with id " + id + " does not exist"));
    }

    public Workout createWorkout(WorkoutDTO workoutDTO) throws AlreadyExistsException {
        // Check if the name is already in the repo
        if (workoutRepo.existsByName(workoutDTO.name())) {
            throw new AlreadyExistsException("Workout already exists");
        } else {
            Workout newWorkout = Workout.builder()
                    .id(idService.generateId())
                    .name(workoutDTO.name())
                    .exerciseIdList(workoutDTO.exerciseIdList())
                    .build();
            return workoutRepo.save(newWorkout);
        }
    }

    public Workout updateWorkout(String id, WorkoutDTO workoutDTO) throws NotExistsException {
        // Check if the name is already in the repo
        if (workoutRepo.existsById(id)) {
            Workout updatedWorkout = Workout.builder()
                    .id(id)
                    .name(workoutDTO.name())
                    .exerciseIdList(workoutDTO.exerciseIdList())
                    .build();
            return workoutRepo.save(updatedWorkout);

        } else {
            throw new NotExistsException("Workout with id " + id + " does not exist");
        }
    }

    public void deleteWorkout(String id) throws NotExistsException {
        if (workoutRepo.existsById(id)) {
            workoutRepo.deleteById(id);
        } else {
            throw new NotExistsException("Workout with id " + id + " does not exist");
        }
    }
}
