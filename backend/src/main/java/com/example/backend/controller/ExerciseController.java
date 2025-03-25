package com.example.backend.controller;

import com.example.backend.model.Exercise;
import com.example.backend.model.ExerciseDTO;
import com.example.backend.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping("/all")
    public ResponseEntity<List<Exercise>> getAllExercises() {
        List<Exercise> all = exerciseService.getAllExercises();
        return ResponseEntity.ok(all);
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
    public ResponseEntity<Exercise> createExercise(@RequestBody ExerciseDTO newExercise) {
        try {
            Exercise createdExercise = exerciseService.createExercise(newExercise);
            return ResponseEntity.ok(createdExercise);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
