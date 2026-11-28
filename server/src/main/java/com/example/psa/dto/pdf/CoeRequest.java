package com.example.psa.dto.pdf;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CoeRequest(
        LocalDate startDate,
        LocalDate endDate,
        @NotBlank @Size(max = 50) String referenceNumber,
        @NotBlank @Size(max = 50) String coeNumber,
        String footerLogo,
        @Size(max = 30) String nameInitial
        ) {
        @JsonIgnore
        @AssertTrue(message = "endDate must not be before startDate")
        public boolean isDateRangeValid() {
                return startDate == null || endDate == null || !endDate.isBefore(startDate);
        }
}
