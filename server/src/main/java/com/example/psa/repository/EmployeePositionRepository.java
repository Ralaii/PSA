package com.example.psa.repository;

import com.example.psa.entity.EmployeePosition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmployeePositionRepository extends JpaRepository<EmployeePosition, UUID> {
}