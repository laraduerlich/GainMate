package com.example.backend.security;

import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Document(collection = "appUsers")
@Builder
public record AppUser(
        String id,
        String username,
        String password,
        String name,
        List<String> exerciseIdList,
        List<String> workoutIdList
) { }
