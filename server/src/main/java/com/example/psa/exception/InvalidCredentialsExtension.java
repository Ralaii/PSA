package com.example.psa.exception;

public class InvalidCredentialsExtension extends RuntimeException {
    public InvalidCredentialsExtension(String message)
    {
        super(message);
    }
}
