package com.example.backend.model;

import java.util.List;

public record Progress(
        String id,
        String date,
        List<Set> sets
) {}
