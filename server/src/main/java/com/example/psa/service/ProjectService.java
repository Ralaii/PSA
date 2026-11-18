package com.example.psa.service;

import com.example.psa.dto.Response.common.PageResponse;
import com.example.psa.dto.Response.project.ProjectDetailResponse;
import com.example.psa.dto.Response.project.ProjectListResponse;
import com.example.psa.dto.Response.project.ProjectMemberResponse;
import com.example.psa.dto.Response.search.ProjectSearchResponse;
import com.example.psa.entity.Project;
import com.example.psa.repository.ProjectRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    public PageResponse<ProjectListResponse> getProjectLists(Pageable pageable) {
        String key = pageable.getPageNumber() + ":"  + pageable.getPageSize() + ":"  + pageable.getSort();
        return redisCache.getOrLoad(
                "projectList",
                key,
                new TypeReference<PageResponse<ProjectListResponse>>() {},
                Duration.ofHours(1),
                () -> findProjectList(pageable)
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
    private PageResponse<ProjectListResponse> findProjectList(Pageable pageable) {
        return PageResponse.from(
                projectRepository.findAll(pageable)
                        .map(ProjectListResponse::from)
        );
    }
}
