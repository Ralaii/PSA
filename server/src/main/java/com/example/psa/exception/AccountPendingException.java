package com.example.psa.exception;

import org.springframework.security.authentication.AccountStatusException;

public class AccountPendingException extends AccountStatusException {
    public AccountPendingException(String message) {
        super(message);
    }
}
