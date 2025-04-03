package com.example.backend.security;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "appUsers")
public record AppUser(
        String id,
        String username,
        String password,
        List<String> exerciseIdList,
        List<String> workoutIdList
) { }
