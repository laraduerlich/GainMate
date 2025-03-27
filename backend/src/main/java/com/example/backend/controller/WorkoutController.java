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

    @PostMapping("/new")
    public ResponseEntity<Workout> createWorkout(@RequestBody WorkoutDTO workout) {
        try {
            Workout newWorkout = workoutService.createWorkout(workout);
            return ResponseEntity.ok(newWorkout);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
