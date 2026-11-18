package com.example.psa.dto.Response.employee;

import com.example.psa.entity.Employee;
import com.example.psa.enums.EmploymentStatus;
import com.example.psa.enums.EmploymentType;

import java.util.UUID;

public record EmployeeListResponse(
        UUID id,
        String employeeNumber,
        String name,
        String email,
        String position,
        String branch,
        EmploymentStatus status,
        EmploymentType employmentType
) {
    public static EmployeeListResponse from(Employee e) {
        String name = e.getFirstName() + " " + e.getLastName() + (e.getMiddleName() != null ? " " + e.getMiddleName() : "");
        return new EmployeeListResponse(
                e.getId(),
                e.getEmployeeNumber(),
                name,
                e.getEmail(),
                e.getPosition().getName(),
                e.getBranch() != null ? e.getBranch().getName() : null,
                e.getStatus(),
                e.getEmploymentType()
        );
    }
}
