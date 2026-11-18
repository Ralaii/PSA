package com.example.psa.dto.Response.common;

public record ApiErrorResponse(
        int status,
        String error,
        String message
){}
