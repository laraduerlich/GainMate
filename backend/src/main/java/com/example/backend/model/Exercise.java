package com.example.backend.model;

import java.util.List;

public record Exercise(
        String id,
        String name,
        String note,
        List<Progress> progressList
) {}
