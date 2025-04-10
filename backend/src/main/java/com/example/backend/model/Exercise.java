package com.example.backend.model;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Document("exercises")
public record Exercise(
        @Id
        String id,
        String name,
        String note,
        List<Progress> progressList
) {}
