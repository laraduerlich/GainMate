package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ExerciseAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String exerciseAlreadyExistsException(ExerciseAlreadyExistsException e) {
        return e.getMessage();
    }

    @ExceptionHandler(ExerciseAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String exerciseNotFoundException(ExerciseAlreadyExistsException e) {
        return e.getMessage();
    }
}
