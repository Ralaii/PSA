package com.example.psa.dto.Response;

import com.example.psa.entity.Branch;
import com.example.psa.entity.Employee;
import com.example.psa.enums.EmploymentStatus;
import com.example.psa.enums.EmploymentType;

import java.util.UUID;

public record EmployeeSummaryResponse(
        UUID id,
        String employeeNumber,
        String name,
        String email,
        String branch,
        EmploymentStatus status,
        EmploymentType employmentType
) {
    public static EmployeeSummaryResponse from(Employee e) {
        String name = e.getFirstName() + " " + e.getLastName() + (e.getMiddleName() != null ? " " + e.getMiddleName() : "");
        return new EmployeeSummaryResponse(
                e.getId(),
                e.getEmployeeNumber(),
                name,
                e.getEmail(),
                e.getBranch() != null ? e.getBranch().getName() : null,
                e.getStatus(),
                e.getEmploymentType()
        );
    }
}
