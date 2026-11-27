package com.example.psa.dto.response.project;

import com.example.psa.entity.ProjectAssignment;

import java.util.UUID;

public record ProjectMemberResponse(
        UUID employeeId,
        String projectEmployeeNum,
        String name,
        String projectPosition
) {
    public static ProjectMemberResponse from(ProjectAssignment a) {
        var e = a.getEmployee();
        String name = e.getFirstName() + " " + e.getLastName();
        return new ProjectMemberResponse(
                a.getId(),
                a.getProjectEmployeeNum(),
                name,
                a.getProjectPosition()
        );
    }
}
