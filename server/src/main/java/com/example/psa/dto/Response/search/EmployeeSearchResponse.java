package com.example.psa.dto.response.search;

import java.util.UUID;

public record EmployeeSearchResponse(
        UUID id,
        String employeeNum,
        String name,
        String email,
        String position
) {
}
