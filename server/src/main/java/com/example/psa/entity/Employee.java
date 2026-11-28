package com.example.psa.entity;

import com.example.psa.enums.CivilStatus;
import com.example.psa.enums.EmploymentCategory;
import com.example.psa.enums.EmploymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Setter
@Getter
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "employee_number", unique = true, nullable = false)
    private String employeeNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(nullable = false, name = "first_name")
    private String firstName;

    @Column(nullable = false, name = "last_name")
    private String lastName;

    @Column(name = "middle_name")
    private String middleName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    private EmployeePosition position;

    @Column(name = "department")
    private String department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "gender")
    private String gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "civil_status")
    private CivilStatus civilStatus;

    @Column(name = "pagibig_number")
    private String pagibigNum;

    @Column(name = "philhealth_number")
    private String philhealthNum;

    @Column(name = "philsys_number")
    private String philsysNum;

    @Column(name = "tin_number")
    private String tinNum;

    @Column(name = "telephone_number")
    private String telephoneNum;

    @Column(name = "phone_number")
    private String phoneNum;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, name = "hire_date")
    private LocalDate hireDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmploymentStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment_category", nullable = false)
    private EmploymentCategory employmentCategory = EmploymentCategory.CONTRACTUAL;

    @Column(name = "contract_start_date")
    private LocalDate contractStartDate;

    @Column(name = "contract_end_date")
    private LocalDate contractEndDate;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmployeeAddress> addresses = new ArrayList<>();

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;

    @LastModifiedBy
    @Column(name = "updated_by")
    private String updatedBy;

    @OneToMany(mappedBy = "employee", cascade =  CascadeType.ALL, orphanRemoval = true)
    @OrderBy("yearFrom ASC")
    private  List<EmployeeEducation> education = new ArrayList<>();

    @OneToMany(mappedBy = "employee")
    private List<ProjectAssignment> projectAssignments = new ArrayList<>();
}
