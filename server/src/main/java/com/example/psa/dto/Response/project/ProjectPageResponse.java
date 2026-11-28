package com.example.psa.dto.response.project;

import com.example.psa.dto.response.common.PageResponse;

import java.util.List;

public record ProjectPageResponse(
        PageResponse<ProjectListResponse> projects,
        List<ProjectStatusResponse> counts
) {
}
