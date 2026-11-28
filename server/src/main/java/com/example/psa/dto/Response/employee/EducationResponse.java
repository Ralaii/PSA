package com.example.psa.dto.response.employee;

import com.example.psa.entity.EmployeeEducation;
import com.example.psa.enums.EducationLevel;

import java.util.UUID;

public record EducationResponse(
        UUID id,
        EducationLevel educationLevel,
        String schoolName,
        String course,
        String highestLevel,
        Integer yearFrom,
        Integer yearTo,
        String honors
) {
    public static EducationResponse from(EmployeeEducation x) {
        return new EducationResponse(
                x.getId(),
                x.getEducationLevel(),
                x.getSchoolName(),
                x.getCourse(),
                x.getHighestLevel(),
                x.getYearFrom(),
                x.getYearTo(),
                x.getHonors());
    }
}