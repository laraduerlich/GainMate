package com.example.backend.controller;

import com.example.backend.model.Exercise;
import com.example.backend.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
