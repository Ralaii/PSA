package com.example.psa.dto.response.employee;

import com.example.psa.entity.ProjectAssignment;
import com.example.psa.enums.ProjectStatus;

import java.time.LocalDate;
import java.util.UUID;

public record EmployeeProjectResponse(
        UUID projectId,
        String projectName,
        ProjectStatus projectStatus,
        String projectEmployeeNum,
        String projectProjectNum,
        String projectDescription,
        String projectPosition,
        LocalDate startDate,
        LocalDate endDate
) {
    public static EmployeeProjectResponse from(ProjectAssignment a) {
        return new EmployeeProjectResponse(
                a.getProject().getId(),
                a.getProject().getName(),
                a.getProject().getStatus(),
                a.getProjectEmployeeNum(),
                a.getProject().getProjectNumber(),
                a.getProject().getDescription(),
                a.getProjectPosition(),
                a.getStartDate(),
                a.getEndDate()
        );
    }
}
