package com.example.psa.service;

import com.example.psa.dto.pdf.CoeModel;
import com.example.psa.dto.pdf.CoeProjectLine;
import com.example.psa.dto.pdf.CoeRequest;
import com.example.psa.entity.Employee;
import com.example.psa.pdf.CoeLogoResolver;
import com.example.psa.pdf.PdfRenderer;
import com.example.psa.repository.EmployeeRepository;
import com.example.psa.repository.HrRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class HrService {
    private final EmployeeRepository employeeRepository;
    private final HrRepository hrRepository;
    private final PdfRenderer pdfRenderer;
    private final CoeLogoResolver logoResolver;

    @Transactional(readOnly = true)
    public byte[] generateCoePdf(String employeeNumber, CoeRequest request) {
        Employee emp = employeeRepository.findByEmployeeNumber(employeeNumber)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found: " + employeeNumber));
        LocalDate from = request.startDate();
        LocalDate to = request.endDate();

        List<CoeProjectLine> projects = (from == null && to == null)
                ? hrRepository.findAllCoeProject(emp.getId())
                : hrRepository.findCoeProject(
                        emp.getId(),
                        from != null ? from : LocalDate.of(1900, 1, 1),
                        to != null ? to : LocalDate.of(9999, 12, 31)
                );

        CoeModel model = CoeModel.of(
                honorific(emp),
                fullName(emp),
                emp.getLastName(),
                request,
                null,
                projects
        );

        return pdfRenderer.render("coe", Map.of(
                "coe", model,
                "headerLeftLogo", logoResolver.headerLeft(),
                "headerRightLogo", logoResolver.headerRight(),
                "footerQrLogo", logoResolver.footerQr()
        ));
    }

    private String honorific(Employee emp) {
        String g = emp.getGender();
        if (g == null) return "";
        return switch (g.trim().toLowerCase()) {
            case "male", "m" -> "MR.";
            case "female", "f" -> "MS.";
            default -> "";
        };
    }

    private String fullName(Employee emp) {
        String middleName = emp.getMiddleName();
        String middleInitital = (middleName != null && !middleName.isBlank())
                ? middleName.trim().substring(0, 1).toUpperCase() + "."
                : "";

        return Stream.of(emp.getFirstName(), middleInitital , emp.getLastName())
                .filter(s -> s != null && !s.isBlank())
                .collect(Collectors.joining(" "));
    }

    private String resolveLogo(String footerLogo) {
        return footerLogo;
    }
}
