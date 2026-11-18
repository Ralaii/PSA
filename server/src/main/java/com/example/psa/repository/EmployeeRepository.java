package com.example.psa.repository;

import com.example.psa.dto.Response.search.EmployeeSearchResponse;
import com.example.psa.entity.Employee;
import com.example.psa.entity.User;
import jakarta.validation.constraints.Email;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    Optional<Employee> findByUserId(UUID userId);

    @Query("""
        select e from Employee e
        left join fetch e.projectAssignments pa
        left join fetch pa.project
        where e.id = :id
""")
    Optional<Employee> findDetailsById(@Param("id") UUID id);

    @EntityGraph(attributePaths = {"branch", "position"})
    Page<Employee> findAll(Pageable pageable);

    boolean existsByEmployeeNumber(String employeeNumber);
    boolean existsByEmail(@Email String email);

    @Query("""
    select new com.example.psa.dto.Response.search.EmployeeSearchResponse(
        e.id, e.employeeNumber, concat(e.firstName, ' ', e.lastName), e.email
    )
    from Employee e
    where lower(concat(e.firstName, ' ', e.lastName)) like lower(concat('%', :q, '%'))
    or lower(e.employeeNumber) like lower(concat('%', :q, '%'))
    or lower(e.email) like lower(concat('%', :q, '%'))
    order by e.firstName, e.lastName, e.employeeNumber, e.email
""")
    List<EmployeeSearchResponse> search(@Param("q") String q, Pageable pageable);
}
