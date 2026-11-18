package com.example.psa.dto.Response.project;

import com.example.psa.entity.Employee;
import com.example.psa.entity.ProjectAssignment;

import java.util.UUID;

public record ProjectAssignmentResponse(
        UUID id,
        Employee employeeId,
        String projectEmployeeNum,
        String projectPosition
) {
    public static ProjectAssignmentResponse from(ProjectAssignment projAssignment) {
        return new ProjectAssignmentResponse(
                projAssignment.getId(),
                projAssignment.getEmployee(),
                projAssignment.getProjectEmployeeNum(),
                projAssignment.getProjectPosition()
        );
    }
}
