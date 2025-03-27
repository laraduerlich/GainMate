package com.example.backend.exception;

public class NotExistsException extends RuntimeException {
    public NotExistsException(String message) {
        super(message);
    }
}
