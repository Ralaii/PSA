package com.example.psa.dto.response.project;

import com.example.psa.entity.ProjectAssignment;

import java.time.LocalDate;
import java.util.UUID;

public record ProjectMemberResponse(
        UUID assignmentId,
        UUID employeeId,
        String projectEmployeeNum,
        String name,
        String projectPosition,
        LocalDate startDate,
        LocalDate endDate
) {
    public static ProjectMemberResponse from(ProjectAssignment a) {
        var e = a.getEmployee();
        String name = e.getFirstName() + " " + e.getLastName();
        return new ProjectMemberResponse(
                a.getId(),
                a.getEmployee().getId(),
                a.getProjectEmployeeNum(),
                name,
                a.getProjectPosition(),
                a.getStartDate(),
                a.getEndDate()
        );
    }
}
