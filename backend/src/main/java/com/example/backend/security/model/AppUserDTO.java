package com.example.backend.security.model;

import lombok.Builder;

import java.util.List;

@Builder
public record AppUserDTO(
        String username,
        String password,
        String name,
        List<String> exerciseIdList,
        List<String> workoutIdList
) { }
