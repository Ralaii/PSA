package com.example.psa.config;

import com.example.psa.entity.Employee;
import com.example.psa.entity.Project;
import com.example.psa.entity.ProjectAssignment;
import com.example.psa.enums.CivilStatus;
import com.example.psa.enums.EmploymentStatus;
import com.example.psa.enums.ProjectStatus;
import com.example.psa.repository.EmployeeRepository;
import com.example.psa.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;

import java.time.LocalDate;

//@Component
@Profile("local")
@RequiredArgsConstructor
public class DavDataSeeder implements CommandLineRunner {
    private final EmployeeRepository employeeRepository;
    private final ProjectRepository projectRepository;

    @Override
    public void run(String... args) throws Exception {
        if (employeeRepository.count() > 0) return;

        Employee juan = employee("EMP-0001", "Juan", "Dela Cruz", "S", "juan@example.com");
        Employee maria = employee("EMP-0002", "Maria", "Santos", null, "maria@example.com");
        Employee pedro = employee("EMP-0003", "Pedro", "Reyes", "L", "pedro@example.com");
        employeeRepository.saveAll(java.util.List.of(juan, maria, pedro));

        Project survey = project("PRJ-2024-0001", "2024 Annual Survey of Blah Blah Blah",
                "Yearly survey of customer satisfaction.",
                ProjectStatus.PLANNING, LocalDate.of(2024, 1, 15), LocalDate.of(2024, 6, 30));
        assign(survey, juan, "SRV-001", "Team Lead");
        assign(survey, maria, "SRV-002", "Surveyor");

        Project audit = project("PRJ-2026-0002", "March Audit",
                "Internal audit of branch records.",
                ProjectStatus.PLANNING, LocalDate.of(2026, 3, 1), LocalDate.of(2026, 3, 31));
        assign(audit, juan, "AUD-010", "Auditor");
        assign(audit, pedro, "AUD-011", "Backend Developer");
        projectRepository.saveAll(java.util.List.of(survey, audit));
    }

    private Employee employee(String employeeNum, String firstName, String lastName, String middleName, String email) {
        Employee e = new Employee();
        e.setEmployeeNumber(employeeNum);
        e.setFirstName(firstName);
        e.setLastName(lastName);
        e.setMiddleName(middleName);
        e.setEmail(email);
        e.setBirthDate(LocalDate.of(1980, 1, 1));
        e.setGender("Male");
        e.setCivilStatus(CivilStatus.SINGLE);
        e.setHireDate(LocalDate.now());
        e.setStatus(EmploymentStatus.EMPLOYED);
        return e;
    }

    private Project project(String projectNumber, String projectName, String projectDescription, ProjectStatus projectStatus, LocalDate start, LocalDate end) {
        Project p = new Project();
        p.setProjectNumber(projectNumber);
        p.setName(projectName);
        p.setDescription(projectDescription);
        p.setStatus(projectStatus);
        p.setStartDate(start);
        p.setEndDate(end);
        return p;
    }

    private void assign(Project project, Employee employee, String projectNumber, String position) {
        ProjectAssignment a = new ProjectAssignment();
        a.setProject(project);
        a.setEmployee(employee);
        a.setProjectEmployeeNum(projectNumber);
        a.setProjectPosition(position);
        project.getAssignments().add(a);
    }
}
