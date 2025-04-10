package com.example.backend.controller;

import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    @GetMapping("/all")
    public ResponseEntity<List<Workout>> getAllWorkouts(@AuthenticationPrincipal User user) {
        try {
            List<Workout> all = workoutService.getAllWorkouts(user);
            return ResponseEntity.ok(all);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
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
    public ResponseEntity<Workout> createWorkout(@RequestBody WorkoutDTO workoutDTO, @AuthenticationPrincipal User user) {
        try {
            Workout newWorkout = workoutService.createWorkout(workoutDTO, user);
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
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable String id, @AuthenticationPrincipal User user) {
        try {
            workoutService.deleteWorkout(id, user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
