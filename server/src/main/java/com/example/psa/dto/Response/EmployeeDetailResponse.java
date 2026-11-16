package com.example.psa.dto.Response;

import com.example.psa.entity.Branch;
import com.example.psa.entity.Employee;
import com.example.psa.enums.CivilStatus;
import com.example.psa.enums.EmploymentStatus;
import com.example.psa.enums.EmploymentType;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record EmployeeDetailResponse(
        UUID id,
        String employeeNumber,
        String name,
        Branch branch,
        LocalDate birthDate,
        String gender,
        CivilStatus civilStatus,
        String pagibigNum,
        String philhealthNum,
        String phylsisNum,
        String telephoneNum,
        String phoneNum,
        String email,
        LocalDate hireDate,
        EmploymentStatus status,
        EmploymentType employmentType,
        List<AddressResponse> addresses,
        List<EducationResponse> education,
        List<ProjectResponse> projects
) {
    public static EmployeeDetailResponse from(Employee e) {
        String name = e.getFirstName() + " " + e.getLastName() + " " + (e.getMiddleName() != null ? " " + e.getMiddleName().charAt(0) : "");
        return new EmployeeDetailResponse(
                e.getId(),
                e.getEmployeeNumber(),
                name,
                e.getBranch(),
                e.getBirthDate(),
                e.getGender(),
                e.getCivilStatus(),
                e.getPagibigNum(),
                e.getPhilhealthNum(),
                e.getPhilsisNum(),
                e.getTelephoneNum(),
                e.getPhoneNum(),
                e.getEmail(),
                e.getHireDate(),
                e.getStatus(),
                e.getEmploymentType(),
                e.getAddresses().stream().map(AddressResponse::from).toList(),
                e.getEducation().stream().map(EducationResponse::from).toList(),
                e.getProjects().stream().map(ProjectResponse::from).toList());
    }
}