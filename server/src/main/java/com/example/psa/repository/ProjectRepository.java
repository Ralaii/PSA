package com.example.psa.repository;

import com.example.psa.dto.Response.project.ProjectListResponse;
import com.example.psa.dto.Response.project.ProjectMemberResponse;
import com.example.psa.dto.Response.search.ProjectSearchResponse;
import com.example.psa.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
    public Optional<Project> findByIdOrderByStatusAsc(UUID id);
    public Optional<Project> findByIdOrderByStatusDesc(UUID id);
    public Optional<Project> findByName(String name);

    @Query(value = """
    select new com.example.psa.dto.Response.project.ProjectListResponse(
        p.id, p.projectNumber, p.name, p.status, p.startDate, p.endDate)
    from Project p
    """, countQuery = "select count(p) from Project p")
    Page<ProjectListResponse> findProjectList(Pageable pageable);

    @Query("""
    select new com.example.psa.dto.Response.project.ProjectMemberResponse(
        e.id,
        pa.projectEmployeeNum,
        concat(e.firstName, ' ', e.lastName),
        pa.projectPosition)
    from ProjectAssignment pa
    join pa.employee e
    where pa.project.id = :projectId
    order by pa.projectEmployeeNum
""")
    List<ProjectMemberResponse> findProjectMembersByProjectId(@Param("projectId") UUID projectId);

    @Query("""
    select new com.example.psa.dto.Response.search.ProjectSearchResponse(
        p.id, p.name, p.projectNumber
        )
    from Project p
    where lower (p.name) like lower(concat('%', :q, '%'))
    or lower(p.projectNumber) like lower(concat('%', :q, '%'))
    order by p.name, p.projectNumber    
""")
    List<ProjectSearchResponse> search(@Param("q") String q, Pageable pageable);
}
