package com.example.backend.model;

import java.time.LocalDate;
import java.util.List;

public record WorkoutDTO(
        String name,
        WorkoutIcon icon,
        List<String> exerciseIdList,
        List<LocalDate> dateList
) { }
