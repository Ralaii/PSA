package com.example.psa.exception;

import com.example.psa.dto.Response.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse(
                401,
                "Unauthorized",
                "Invalid credentials"
        );
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(apiErrorResponse);
    }

    @ExceptionHandler(AccountNotActiveException.class)
    public ResponseEntity<ApiErrorResponse> handleAccountNotActive(AccountNotActiveException ex) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse(
                403,
                "Forbidden",
                ex.getMessage()
        );
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(apiErrorResponse);
    }

    @ExceptionHandler(UsernameTakenException.class)
    public ResponseEntity<ApiErrorResponse> handleUsernameTakenException(UsernameTakenException ex) {
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse(
                409,
                "Email taken",
                ex.getMessage()
        );
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(apiErrorResponse);
    }
}