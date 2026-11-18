package com.example.psa.dto.Response.employee;

import com.example.psa.entity.Employee;
import com.example.psa.entity.EmployeePosition;
import com.example.psa.enums.CivilStatus;
import com.example.psa.enums.EmploymentStatus;
import com.example.psa.enums.EmploymentType;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record UpdateEmployeeResponse(
        UUID id,
        String employeeNum,
        EmployeePosition position,
        String firstName,
        String lastName,
        String middleName,
        LocalDate birthDate,
        CivilStatus civilStatus,
        String pagibigNum,
        String philhealthNum,
        String philsisNum,
        String tinNum,
        String telephoneNum,
        String phoneNum,
        String email,
        EmploymentStatus status,
        EmploymentType employmentType,
        Instant updatedAt,
        String updatedBy
) {
    public static UpdateEmployeeResponse from(Employee e) {
        return new UpdateEmployeeResponse(
                e.getId(),
                e.getEmployeeNumber(),
                e.getPosition(),
                e.getFirstName(),
                e.getLastName(),
                e.getMiddleName() != null ? e.getMiddleName() : null,
                e.getBirthDate(),
                e.getCivilStatus(),
                e.getPagibigNum(),
                e.getPhilhealthNum(),
                e.getPhilsisNum(),
                e.getTinNum(),
                e.getTelephoneNum(),
                e.getPhoneNum(),
                e.getEmail(),
                e.getStatus(),
                e.getEmploymentType(),
                e.getUpdatedAt(),
                e.getUpdatedBy()
        );
    }

}
