package com.example.backend.model;

import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Document("exercises")
public record Exercise(
        String id,
        String name,
        String note,
        List<Progress> progressList
) {}
