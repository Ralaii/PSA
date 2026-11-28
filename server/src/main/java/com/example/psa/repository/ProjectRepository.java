package com.example.psa.repository;

import com.example.psa.dto.response.project.ProjectListResponse;
import com.example.psa.dto.response.project.ProjectMemberResponse;
import com.example.psa.dto.response.search.ProjectSearchResponse;
import com.example.psa.entity.Project;
import com.example.psa.enums.ProjectStatus;
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
    select new com.example.psa.dto.response.project.ProjectListResponse(
        p.id, p.projectNumber, p.name, p.status, p.startDate, p.endDate
            )
    from Project p
    """, countQuery = "select count(p) from Project p")
    Page<ProjectListResponse> findAllProjectList(Pageable pageable);

    @Query("""
    select new com.example.psa.dto.response.project.ProjectListResponse(
        p.id, p.projectNumber, p.name, p.status, p.startDate, p.endDate
    )
    from Project p
    where p.status = :status
""")
    Page<ProjectListResponse> findProjectListByStatus(@Param("status") ProjectStatus status, Pageable pageable);

    @Query("""
    select p
    from Project p
    where lower(p.projectNumber) like lower(concat('%', :q, '%'))
        or lower(p.name) like lower(concat('%', :q, '%'))
""")
    Page<Project> searchProjectPage(@Param("q") String q,
                                    Pageable pageable);

    @Query("""
    select p
    from Project p
    where p.status = :status
        and (lower(p.projectNumber) like lower(concat('%', :q, '%'))
            or lower(p.name) like lower(concat('%', :q, '%')))
""")
    Page<Project> searchProjectPageByStatus(@Param("q") String q,
                                            @Param("status") ProjectStatus status,
                                            Pageable pageable);

    @Query("""
    select new com.example.psa.dto.response.project.ProjectMemberResponse(
        pa.id,
        e.id,
        pa.projectEmployeeNum,
        concat(e.firstName, ' ', e.lastName),
        pa.projectPosition,
        pa.startDate,
        pa.endDate
        )
    from ProjectAssignment pa
    join pa.employee e
    where pa.project.id = :projectId
    order by pa.projectEmployeeNum
""")
    List<ProjectMemberResponse> findProjectMembersByProjectId(@Param("projectId") UUID projectId);

    @Query("""
    select new com.example.psa.dto.response.search.ProjectSearchResponse(
        p.id, p.name, p.projectNumber, p.status
        )
    from Project p
    where lower (p.name) like lower(concat('%', :q, '%'))
    or lower(p.projectNumber) like lower(concat('%', :q, '%'))
    order by p.name, p.projectNumber
""")
    List<ProjectSearchResponse> search(@Param("q") String q, Pageable pageable);

    @Query("""
    select p.status, count(p)
    from Project p
    group by p.status
""")
    List<Object[]> countProjectByStatus();
}
