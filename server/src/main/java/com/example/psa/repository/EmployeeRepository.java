package com.example.psa.repository;

import com.example.psa.entity.Employee;
import com.example.psa.entity.UserSession;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    public Employee findByEmployeeNumberOrderByEmployeeNumberDesc(String employeeNumber);
    public Employee findByEmployeeNumber(UUID employeeNumber);
    public Employee findByLastName(String lastName);
    public Employee findByFirstName(String firstName);

    @EntityGraph(attributePaths = {"addresses", "education"})
    Optional<Employee> findWithDetailsById(UUID id);

    @EntityGraph(attributePaths = {"branch"})
    Page<Employee> findAll(Pageable pageable);

    boolean existsByEmployeeNumber(String employeeNumber);
    boolean existsByEmail(@Email String email);
}
