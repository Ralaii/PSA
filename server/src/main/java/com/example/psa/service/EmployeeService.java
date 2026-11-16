package com.example.psa.service;

import com.example.psa.dto.Request.UpdateEmployeeRequest;
import com.example.psa.dto.Response.UpdateEmployeeResponse;
import com.example.psa.exception.DuplicateResourceException;
import org.springframework.security.access.prepost.PreAuthorize;
import tools.jackson.core.type.TypeReference;
import com.example.psa.dto.Response.EmployeeDetailResponse;
import com.example.psa.dto.Response.EmployeeSummaryResponse;
import com.example.psa.dto.Response.PageResponse;
import com.example.psa.entity.Employee;
import com.example.psa.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.UUID;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final RedisCache redisCache;

//  FETCHES EMPLOYEE DETAILS
    @Cacheable(value = "employee", key = "#id")
    public EmployeeDetailResponse getEmployeeDetails(UUID id) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return EmployeeDetailResponse.from(e);
    }

//  FETCH EMPLOYEES LISTS
    public PageResponse<EmployeeSummaryResponse> getEmployees(Pageable pageable) {
        String key = pageable.getPageNumber() + ":" + pageable.getPageSize() + ':' + pageable.getSort();
        return redisCache.getOrLoad(
                "employeeList",
                key,
                new TypeReference<PageResponse<EmployeeSummaryResponse>>() {},
                Duration.ofHours(1),
                () -> fetchEmployeesFromDb(pageable));
    }

//  HELPER & FALLBACK METHOD (DB CALL) FOR getEmployees
    private PageResponse<EmployeeSummaryResponse> fetchEmployeesFromDb(Pageable pageable) {
        return PageResponse.from(
                employeeRepository.findAll(pageable).map(EmployeeSummaryResponse::from)
        );
    }
}
