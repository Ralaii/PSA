package com.example.psa.exception;

import com.example.psa.enums.AccountStatus;

public class AccountNotActiveException extends RuntimeException {
    private final AccountStatus accountStatus;

    public AccountNotActiveException(AccountStatus accountStatus) {
        super("Account not active");
        this.accountStatus = accountStatus;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }
}
