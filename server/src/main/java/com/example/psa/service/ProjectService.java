package com.example.psa.service;

import com.example.psa.dto.response.common.PageResponse;
import com.example.psa.dto.response.project.*;
import com.example.psa.dto.response.search.ProjectSearchResponse;
import com.example.psa.entity.Project;
import com.example.psa.enums.ProjectStatus;
import com.example.psa.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.core.type.TypeReference;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final RedisCache redisCache;

//  FETCH PROJECT DETAILS
    public ProjectDetailResponse getProjectDetail(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<ProjectMemberResponse> members = projectRepository.findProjectMembersByProjectId(id);
        return ProjectDetailResponse.from(project, members);
    }

//  FETCH PROJECTS LISTS
    public ProjectPageResponse getProjectLists(String q, ProjectStatus status, Pageable pageable) {
        String term = (q == null) ? "" : q.trim();

        PageResponse<ProjectListResponse> projects;

        if (!term.isEmpty()) {
            projects = searchProjectsFromDb(term, status, pageable);
        } else {
            String key = (status == null ? "ALL" : status.name())
                    + ":" + pageable.getPageNumber()
                    + ":" + pageable.getPageSize()
                    + ":" + pageable.getSort();

            redisCache.getOrLoad(
                    "projectList",
                    key,
                    new TypeReference<PageResponse<ProjectListResponse>>() {},
                    Duration.ofHours(1),
                    () -> fetchProjectsFromDb(status, pageable)
            );

            projects =  fetchProjectsFromDb(status, pageable);
        }
        List<ProjectStatusResponse> counts = fetchProjectCounts();
        return new ProjectPageResponse(projects, counts);
    }

    private PageResponse<ProjectListResponse> searchProjectsFromDb(String term, ProjectStatus status, Pageable pageable) {
        Page<Project> page = (status == null)
                ? projectRepository.searchProjectPage(term, pageable)
                : projectRepository.searchProjectPageByStatus(term, status, pageable);
        return PageResponse.from(
                page.map(ProjectListResponse::from)
        );
    }

//  SEARCH QUERY
    @Transactional(readOnly = true)
    public List<ProjectSearchResponse> searchProjects(String q, int limit) {
        String term = q == null ? "" : q.trim().toLowerCase();
        if (term.length() < 2) {
            return List.of();
        }
        int size = Math.clamp(limit, 1, 20);
        return projectRepository.search(term, PageRequest.of(0, size));
    }

//  HELPER METHOD FOR PROJECT LISTS
    private PageResponse<ProjectListResponse> fetchProjectsFromDb(ProjectStatus status,Pageable pageable) {
        Page<ProjectListResponse> page = (status == null)
                ? projectRepository.findAllProjectList(pageable)
                : projectRepository.findProjectListByStatus(status, pageable);
        return PageResponse.from(page);
    }

//  HELPER METHOD TO FETCH PROJECT STATUSES COUNT FOR LISTING
    private List<ProjectStatusResponse> fetchProjectCounts() {
        return projectRepository.countProjectByStatus()
                .stream()
                .map(row -> ProjectStatusResponse.of(
                        (ProjectStatus) row[0],
                        (Long) row[1]
                ))
                .toList();
    }
}
