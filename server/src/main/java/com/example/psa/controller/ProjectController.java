package com.example.psa.controller;

import com.example.psa.dto.response.common.PageResponse;
import com.example.psa.dto.response.project.ProjectDetailResponse;
import com.example.psa.dto.response.project.ProjectListResponse;
import com.example.psa.dto.response.search.ProjectSearchResponse;
import com.example.psa.enums.ProjectStatus;
import com.example.psa.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public PageResponse<ProjectListResponse> getProjectList(
            @RequestParam(required = false) ProjectStatus projectStatus,
            @RequestParam(required = false) String q,
            @PageableDefault(size = 25, sort = "projectNumber") Pageable pageable){
        return projectService.getProjectLists(q, projectStatus, pageable);
    }

    @GetMapping("/{id}")
    public ProjectDetailResponse getProjectDetail(@PathVariable UUID id){
        return projectService.getProjectDetail(id);
    }

    @GetMapping("/search")
    public List<ProjectSearchResponse> searchProjects(@RequestParam String q, @RequestParam(defaultValue = "5") int limit){
        return projectService.searchProjects(q, limit);
    }
}
