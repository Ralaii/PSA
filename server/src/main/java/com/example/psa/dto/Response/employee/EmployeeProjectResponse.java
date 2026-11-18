package com.example.psa.dto.Response.employee;

import com.example.psa.entity.ProjectAssignment;
import com.example.psa.enums.ProjectStatus;

import java.util.UUID;

public record EmployeeProjectResponse(
        UUID projectId,
        String projectName,
        ProjectStatus projectStatus,
        String projectEmployeeNum,
        String projectPosition
) {
    public static EmployeeProjectResponse from(ProjectAssignment a) {
        return new EmployeeProjectResponse(
                a.getProject().getId(),
                a.getProject().getName(),
                a.getProject().getStatus(),
                a.getProjectEmployeeNum(),
                a.getProjectPosition()
        );
    }
}
