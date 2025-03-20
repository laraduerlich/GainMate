package com.example.backend.model;

import java.util.List;

public record Progress(
        String date,
        List<Sets> sets
) {}
