package com.example.psa.dto.Request;

import com.example.psa.entity.EmployeePosition;
import com.example.psa.enums.CivilStatus;
import com.example.psa.enums.EmploymentStatus;
import com.example.psa.enums.EmploymentType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.util.UUID;

public record UpdateEmployeeRequest(

        @Pattern(regexp = ".*\\S.*", message = "First name cannot be blank")
        String firstName,

        @Pattern(regexp = ".*\\S.*", message = "Last name cannot be blank")
        String lastName,

        String middleName,

//        @Pattern(regexp = "^EMP-\\d{4}-\\d+$", message = "Format must be EMP-YYYY-N")
        String employeeNum,

        UUID positionId,

        @Past(message = "Birth date must be in the past")
        LocalDate birthDate,

        CivilStatus civilStatus,
        String pagibigNum,
        String philhealthNum,
        String philsisNum,
        String tinNum,
        String telephoneNum,
        String phoneNum,

        @Email(message = "Invalid email format")
        @Pattern(regexp = ".*\\S.*", message = "Email cannot be blank")
        String email,

        EmploymentStatus status,
        EmploymentType employmentType
) {}
