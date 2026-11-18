package com.example.psa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "project_assignment",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"project_id", "employee_id"}),
                @UniqueConstraint(columnNames = {"project_id", "project_employee_num"})
        }
)
@Getter @Setter
public class ProjectAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "project_employee_num")
    private String projectEmployeeNum;

    @Column(name = "projectPosition")
    private String projectPosition;
}
