package com.example.backend.model;

import java.util.List;

public record Excercise(
        String id,
        String name,
        String note,
        List<Progress> progressList
) {}
