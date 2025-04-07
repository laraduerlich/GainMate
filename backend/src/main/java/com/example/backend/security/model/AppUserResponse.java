package com.example.backend.security.model;

import lombok.Builder;

import java.util.List;

@Builder
public record AppUserResponse (
        String username,
        String name,
        List<String> exerciseIdList,
        List<String> workoutIdList
) { }
