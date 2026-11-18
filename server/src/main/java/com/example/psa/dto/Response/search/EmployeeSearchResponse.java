package com.example.psa.dto.Response.search;

import java.util.UUID;

public record EmployeeSearchResponse(
        UUID id,
        String employeeNum,
        String name,
        String email
) {
}
