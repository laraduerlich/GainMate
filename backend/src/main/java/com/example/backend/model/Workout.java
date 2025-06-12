package com.example.backend.model;

import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Builder
@Document("workouts")
public record Workout(
        String id,
        String name,
        WorkoutIcon icon,
        List<String> exerciseIdList,
        List<String> dateList
) { }
