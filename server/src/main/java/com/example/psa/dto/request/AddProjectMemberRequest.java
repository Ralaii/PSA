package com.example.psa.dto.request;

import com.example.psa.entity.ProjectAssignment;

import java.time.LocalDate;
import java.util.UUID;

public record AddProjectMemberRequest(
        UUID employeeId,
        String projectEmployeeNum,
        String projectPosition,
        LocalDate startDate,
        LocalDate endDate
) {
    public ProjectAssignment toEntity() {

        ProjectAssignment pa = new ProjectAssignment();
        pa.setProjectEmployeeNum(projectEmployeeNum());
        pa.setProjectPosition(projectPosition());
        pa.setStartDate(startDate());
        pa.setEndDate(endDate());

        return pa;
    }
}
