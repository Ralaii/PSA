package com.example.psa.repository;

import com.example.psa.dto.pdf.CoeProjectLine;
import com.example.psa.entity.ProjectAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface HrRepository extends JpaRepository<ProjectAssignment, UUID> {
    @Query("""
    select new com.example.psa.dto.pdf.CoeProjectLine(p.name, pa.projectPosition, pa.startDate, pa.endDate)
    from ProjectAssignment pa
    join pa.project p
    where pa.employee.id = :employeeId
    order by pa.startDate desc
""")
    List<CoeProjectLine> findAllCoeProject(@Param("employeeId") UUID employeeId);

    @Query("""
        select new com.example.psa.dto.pdf.CoeProjectLine(p.name, pa.projectPosition, pa.startDate, pa.endDate)
        from ProjectAssignment pa
        join pa.project p
        where pa.employee.id = :employeeId
            and (pa.endDate is null or pa.endDate >= :from)
            and pa.startDate <= :to
        order by pa.startDate desc
""")
    List<CoeProjectLine> findCoeProject(@Param("employeeId") UUID employeeId,
                                        @Param("from")  LocalDate from,
                                        @Param("to") LocalDate to);
}
