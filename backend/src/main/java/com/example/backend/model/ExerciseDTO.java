package com.example.backend.model;

import lombok.Builder;

import java.util.List;

@Builder
public record ExerciseDTO (
        String name,
        String note,
        List<Progress> progressList

) {}
