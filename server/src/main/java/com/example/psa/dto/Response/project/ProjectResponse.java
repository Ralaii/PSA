package com.example.psa.dto.Response.project;

import com.example.psa.entity.Project;
import com.example.psa.enums.ProjectStatus;

import java.util.UUID;

public record ProjectResponse(
        UUID id,
        String name,
        String description,
        ProjectStatus status
) {
    public static ProjectResponse from(Project p) {
        return new ProjectResponse(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getStatus());
    }
}