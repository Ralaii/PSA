package com.example.psa.repository;

import com.example.psa.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
    public Optional<Project> findByIdOrderByStatusAsc(UUID id);
    public Optional<Project> findByIdOrderByStatusDesc(UUID id);
    public Optional<Project> findByName(String name);
}
