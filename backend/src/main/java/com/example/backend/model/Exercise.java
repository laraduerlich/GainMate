package com.example.backend.model;

import lombok.Builder;

import java.util.List;

@Builder
public record Exercise(
        String id,
        String name,
        String note,
        List<Progress> progressList
) {}
