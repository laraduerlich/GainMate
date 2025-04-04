package com.example.backend.security;

import lombok.Builder;

import java.util.List;

@Builder
public record AppUserDTO(
        String username,
        String name,
        List<String> exerciseIdList,
        List<String> workoutIdList
) { }
