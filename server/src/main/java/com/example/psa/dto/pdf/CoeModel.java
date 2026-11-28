package com.example.psa.dto.pdf;

import java.time.LocalDate;
import java.util.List;

public record CoeModel(
        String honorific,
        String employeeName,
        String lastName,
        LocalDate startDate,
        LocalDate endDate,
        List<CoeProjectLine> projects,
        String referenceNumber,
        String coeNumber,
        String nameInitial,
        String footerLogo,
        LocalDate issueDate
) {
    public static CoeModel of(String honorific,
                              String employeeName,
                              String lastName,
                              CoeRequest request,
                              String footerLogoDataUri,
                              List<CoeProjectLine> projects) {
        return new CoeModel(
                honorific,
                employeeName,
                lastName,
                request.startDate(),
                request.endDate(),
                projects,
                request.referenceNumber(),
                request.coeNumber(),
                request.nameInitial(),
                footerLogoDataUri,
                LocalDate.now()
        );
    }

    public int issueDay() {
        return issueDate.getDayOfMonth();
    }

    public String issueDaySuffix() {
        int d = issueDate.getDayOfMonth();
        if (d >= 11 && d <= 13) return "th";
        return switch (d % 10) {
            case 1 -> "st";
            case 2 -> "nd";
            case 3 -> "rd";
            default -> "th";
        };
    }
}