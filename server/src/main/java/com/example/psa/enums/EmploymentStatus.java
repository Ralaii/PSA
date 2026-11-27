package com.example.psa.enums;

public enum EmploymentStatus {
    EMPLOYED,
    ON_LEAVE,
    SUSPENDED,
    RESIGNED,
    TERMINATED,
    END_OF_CONTRACT,
    RETIRED;

    public boolean isSeparated() {
        return this == RESIGNED || this == TERMINATED
                || this == END_OF_CONTRACT || this == RETIRED;
    }
}