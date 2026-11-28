package com.example.psa.dto.response.project;

import com.example.psa.entity.Project;
import com.example.psa.enums.ProjectStatus;

import java.time.LocalDate;
import java.util.UUID;

public record ProjectListResponse(
        UUID id,
        String projectNumber,
        String name,
        ProjectStatus status,
        LocalDate startDate,
        LocalDate endDate
) {
    public static ProjectListResponse from(Project proj) {
        return new ProjectListResponse(
                proj.getId(),
                proj.getProjectNumber(),
                proj.getName(),
                proj.getStatus(),
                proj.getStartDate(),
                proj.getEndDate()
        );
    }
}
