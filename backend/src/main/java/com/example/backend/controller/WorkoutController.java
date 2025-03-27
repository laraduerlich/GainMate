package com.example.backend.controller;

import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    @GetMapping("/all")
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        List<Workout> allWorkouts = workoutService.getAllWorkouts();
        return ResponseEntity.ok(allWorkouts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable String id) {
        try {
            Workout workout = workoutService.getWorkoutById(id);
            return ResponseEntity.ok(workout);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/new")
    public ResponseEntity<Workout> createWorkout(@RequestBody WorkoutDTO workoutDTO) {
        try {
            Workout newWorkout = workoutService.createWorkout(workoutDTO);
            return ResponseEntity.ok(newWorkout);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable String id, @RequestBody WorkoutDTO workoutDTO) {
        try {
            Workout updatedWorkout = workoutService.updateWorkout(id, workoutDTO);
            return ResponseEntity.ok(updatedWorkout);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
