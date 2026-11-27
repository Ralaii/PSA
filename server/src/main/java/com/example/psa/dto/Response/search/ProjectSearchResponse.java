package com.example.psa.dto.response.search;

import com.example.psa.enums.ProjectStatus;

import java.util.UUID;

public record ProjectSearchResponse(
        UUID id, String name, String projectNumber, ProjectStatus status
) {
}
