package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String alreadyExistsException(AlreadyExistsException e) {
        return e.getMessage();
    }

    @ExceptionHandler(NotExistsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String notExistsException(NotExistsException e) {
        return e.getMessage();
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String usernameNotFoundException(UsernameNotFoundException e) {
        return e.getMessage();
    }
}
