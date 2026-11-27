package com.example.psa.dto.pdf;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public record CoeProjectLine(
        String projectName,
        String positionName,
        LocalDate startDate,
        LocalDate endDate
) {
    private static final DateTimeFormatter FULL =
            DateTimeFormatter.ofPattern("d MMMM yyyy", Locale.ENGLISH);

    public String dateRange() {
        if (startDate == null) return "";
        if (endDate == null) return FULL.format(startDate) + " to present";
        if (YearMonth.from(startDate).equals(YearMonth.from(endDate))) {
            return startDate.getDayOfMonth() + " to " + FULL.format(endDate);
        }
        return FULL.format(startDate) + " to " + FULL.format(endDate);
    }
}