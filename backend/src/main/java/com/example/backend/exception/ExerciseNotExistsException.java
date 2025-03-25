package com.example.backend.exception;

public class ExerciseNotExistsException extends RuntimeException {
    public ExerciseNotExistsException(String message) {
        super(message);
    }
}
