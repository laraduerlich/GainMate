package com.example.backend.security.model;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "appUsers")
@Builder
public record AppUser(
        @Id
        String id,
        String username,
        String password,
        String name,
        List<String> exerciseIdList,
        List<String> workoutIdList
) { }
