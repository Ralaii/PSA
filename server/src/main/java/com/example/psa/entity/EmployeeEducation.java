package com.example.psa.entity;

import com.example.psa.enums.EducationLevel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "employee_education")
public class EmployeeEducation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Enumerated(EnumType.STRING)
    @Column(name = "education_level", nullable = false)
    private EducationLevel educationLevel;

    @Column(name = "school_name", nullable = false)
    private String schoolName;

    @Column
    private String course;

    @Column(name = "highest_level")
    private String highestLevel;

    @Column(name = "year_from", nullable = false)
    private Integer yearFrom;

    @Column(name = "year_to")
    private Integer yearTo;

    @Column
    private String honors;


}