package com.example.psa.dto.response.project;

import com.example.psa.enums.ProjectStatus;

public record ProjectStatusResponse(
        ProjectStatus status,
        Long count
) {
    public static  ProjectStatusResponse of(ProjectStatus status, Long count) {
        return new ProjectStatusResponse(status, count);
    }
}
