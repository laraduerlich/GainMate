package com.example.backend.model;

import java.util.List;

public record WorkoutDTO(
        String name,
        List<String> exerciseIdList
) { }
