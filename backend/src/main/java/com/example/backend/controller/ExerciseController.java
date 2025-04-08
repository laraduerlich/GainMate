package com.example.backend.controller;

import com.example.backend.model.Exercise;
import com.example.backend.model.ExerciseDTO;
import com.example.backend.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping("/all")
    public ResponseEntity<List<Exercise>> getAllExercises(@AuthenticationPrincipal User user) {
        try {
            List<Exercise> all = exerciseService.getAllExercises(user);
            return ResponseEntity.ok(all);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable String id) {
        try {
            Exercise exercise = exerciseService.getExerciseById(id);
            return ResponseEntity.ok(exercise);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/new")
    public ResponseEntity<Exercise> createExercise(@RequestBody ExerciseDTO exerciseDTO, @AuthenticationPrincipal User user) {
        try {
            Exercise newExercise = exerciseService.createExercise(exerciseDTO, user);
            return ResponseEntity.ok(newExercise);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable String id, @RequestBody ExerciseDTO exerciseDTO) {
        try {
            Exercise updatedExercise = exerciseService.updateExercise(id, exerciseDTO);
            return ResponseEntity.ok(updatedExercise);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable String id) {
        try {
            exerciseService.deleteExercise(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
