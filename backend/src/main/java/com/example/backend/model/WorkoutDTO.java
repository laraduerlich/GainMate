package com.example.backend.model;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record WorkoutDTO(
        String name,
        WorkoutIcon icon,
        List<String> exerciseIdList,
        List<LocalDate> dateList
) { }
