package com.example.psa.dto.Response;

public record ApiErrorResponse(
        int status,
        String error,
        String message
){}
