package com.example.psa.dto.response.common;

public record ApiErrorResponse(
        int status,
        String error,
        String message
){}
