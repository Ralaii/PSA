package com.example.psa.dto.Response.project;

import com.example.psa.entity.Project;
import com.example.psa.enums.ProjectStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record ProjectDetailResponse(
        UUID id,
        String name,
        String description,
        ProjectStatus status,
        LocalDate startDate,
        LocalDate endDate,
        List<ProjectMemberResponse> members
) {
    public static ProjectDetailResponse from(Project proj, List<ProjectMemberResponse> members) {
        return new ProjectDetailResponse(
                proj.getId(), proj.getName(), proj.getDescription(),
                proj.getStatus(), proj.getStartDate(), proj.getEndDate(),
                members
        );
    }
}
