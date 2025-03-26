package com.example.backend.controller;

import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workout")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

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
