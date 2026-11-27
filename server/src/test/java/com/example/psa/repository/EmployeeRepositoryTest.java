package com.example.psa.repository;

import com.example.psa.entity.Employee;
import com.example.psa.entity.Project;
import com.example.psa.entity.ProjectAssignment;
import com.example.psa.enums.EmploymentStatus;
import jakarta.persistence.EntityManager;
import org.hibernate.Hibernate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class EmployeeRepositoryTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:16");

    @Autowired EmployeeRepository employeeRepository;
    @Autowired EntityManager em;

    @Test
    void findDetailsById_loadsAssignmentsAndProjects() {
        // ARRANGE
        Employee juan = new Employee();
        juan.setEmployeeNumber("EMP-0001");
        juan.setFirstName("Juan");
        juan.setLastName("Dela Cruz");
        juan.setEmail("juan@example.com");
        juan.setHireDate(LocalDate.of(2022, 6, 1));
        juan.setStatus(EmploymentStatus.EMPLOYED);
        em.persist(juan);

        Project audit = new Project();
        audit.setProjectNumber("PRJ-2026-0002");
        audit.setName("March Audit");
        audit.setDescription("Internal audit");
        audit.setStartDate(LocalDate.of(2026, 3, 1));
        audit.setEndDate(LocalDate.of(2026, 3, 31));

        ProjectAssignment a = new ProjectAssignment();
        a.setProject(audit);
        a.setEmployee(juan);
        a.setProjectEmployeeNum("AUD-010");
        a.setProjectPosition("Auditor");
        audit.getAssignments().add(a);
        em.persist(audit);

        em.flush();
        em.clear();

        // ACT
        Employee found = employeeRepository.findDetailsById(juan.getId()).orElseThrow();

        // ASSERT
        assertThat(found.getProjectAssignments()).hasSize(1);
        ProjectAssignment loaded = found.getProjectAssignments().get(0);
        assertThat(loaded.getProjectEmployeeNum()).isEqualTo("AUD-010");
        assertThat(Hibernate.isInitialized(loaded.getProject())).isTrue();
        assertThat(loaded.getProject().getName()).isEqualTo("March Audit");
    }
}