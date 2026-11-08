package com.example.psa.repository;

import com.example.psa.entity.Employee;
import com.example.psa.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    public Employee findByEmployeeNumberOrderByEmployeeNumberDesc(String employeeNumber);
    public Employee findByEmployeeNumber(UUID employeeNumber);
    public Employee findByLastName(String lastName);
    public Employee findByFirstName(String firstName);
}
