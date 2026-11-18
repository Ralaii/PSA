package com.example.psa.service;

import com.example.psa.dto.Response.employee.EmployeeDetailResponse;
import com.example.psa.dto.Response.employee.EmployeeListResponse;
import com.example.psa.dto.Response.common.PageResponse;
import com.example.psa.entity.Employee;
import com.example.psa.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.core.type.TypeReference;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final RedisCache redisCache;

//  FETCHES EMPLOYEE DETAILS
    @Cacheable(value = "employee", key = "#id")
    public EmployeeDetailResponse getEmployeeDetails(UUID id) {
        Employee e = employeeRepository.findDetailsById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return EmployeeDetailResponse.from(e);
    }

//  FETCH EMPLOYEES LISTS
    public PageResponse<EmployeeListResponse> getEmployeesList(Pageable pageable) {
        String key = pageable.getPageNumber() + ":" + pageable.getPageSize() + ':' + pageable.getSort();
        return redisCache.getOrLoad(
                "employeeList",
                key,
                new TypeReference<PageResponse<EmployeeListResponse>>() {},
                Duration.ofHours(1),
                () -> fetchEmployeesListFromDb(pageable)
        );
    }

//  HELPER & FALLBACK METHOD (DB CALL) FOR getEmployees
    private PageResponse<EmployeeListResponse> fetchEmployeesListFromDb(Pageable pageable) {
        return PageResponse.from(
                employeeRepository.findAll(pageable)
                        .map(EmployeeListResponse::from)
        );
    }
}
