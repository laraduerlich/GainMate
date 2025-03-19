package com.example.backend.controller;

import com.example.backend.model.Excercise;
import com.example.backend.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping
    public ResponseEntity<List<Excercise>> getAllExercises() {
        List<Excercise> all = exerciseService.getAllExercises();
        return ResponseEntity.ok(all);
    }
}
