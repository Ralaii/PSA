package com.example.psa.repository;

import com.example.psa.dto.response.employee.EmployeeListResponse;
import com.example.psa.dto.response.search.EmployeeSearchResponse;
import com.example.psa.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    @Query("""
    select concat(e.firstName, ' ', e.lastName)
    from Employee e
    where e.user.id = :userId
""")
    Optional<String> findEmployeeNameByUserId(@Param("userId") UUID userId);

    @Query("""
        select e from Employee e
        left join fetch e.projectAssignments pa
        left join fetch pa.project
        where e.id = :id
""")
    Optional<Employee> findDetailsById(@Param("id") UUID id);

    @Query("""
            select new com.example.psa.dto.response.employee.EmployeeListResponse(
                        e.id, e.employeeNumber, concat(e.firstName, ' ', e.lastName), e.email, ep.name, e.department, e.phoneNum
                        )
            from Employee e
            join e.position ep
            """)
    Page<EmployeeListResponse> findAllEmployeeList(Pageable pageable);

    boolean existsByEmployeeNumber(String employeeNumber);
    boolean existsByEmail(String email);

    @Query("""
    select new com.example.psa.dto.response.search.EmployeeSearchResponse(
        e.id, e.employeeNumber, concat(e.firstName, ' ', e.lastName), e.email, p.name
    )
    from Employee e
    join e.position p
    where lower(concat(e.firstName, ' ', e.lastName)) like lower(concat('%', :q, '%'))
    or lower(e.employeeNumber) like lower(concat('%', :q, '%'))
    or lower(e.email) like lower(concat('%', :q, '%'))
    or lower(p.name) like lower(concat('%', :q, '%'))
""")
    List<EmployeeSearchResponse> search(@Param("q") String q, Pageable pageable);

    @Query("""
    select e
    from Employee e
    where lower(concat(e.firstName, ' ', e.lastName)) like lower(concat('%', :q, '%'))
    or lower (e.employeeNumber) like lower(concat('%', :q, '%'))
    or lower (e.email) like lower(concat('%', :q, '%'))
""")
    Page<Employee> searchPage(@Param("q") String q, Pageable pageable);

    Optional<Employee> findByEmployeeNumber(String employeeNumber);
}
