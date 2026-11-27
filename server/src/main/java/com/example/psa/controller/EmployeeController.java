package com.example.psa.controller;

import com.example.psa.dto.request.UpdateEmployeeRequest;
import com.example.psa.dto.response.employee.EmployeeDetailResponse;
import com.example.psa.dto.response.employee.EmployeeListResponse;
import com.example.psa.dto.response.common.PageResponse;
import com.example.psa.dto.response.employee.UpdateEmployeeResponse;
import com.example.psa.dto.response.search.EmployeeSearchResponse;
import com.example.psa.service.EmployeeService;
import com.example.psa.service.EmployeeUpdateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;
    private final EmployeeUpdateService employeeUpdateService;

    @GetMapping
    public PageResponse<EmployeeListResponse> getEmployeesList(
            @RequestParam(required = false) String q,
            @PageableDefault(size = 25, sort = "employeeNumber")Pageable pageable){
        return employeeService.getEmployeesList(q, pageable);
    }

    @GetMapping("/{id}")
    public EmployeeDetailResponse getEmployee(@PathVariable UUID id){
        return employeeService.getEmployeeDetails(id);
    }

    @PatchMapping("/{id}")
    public UpdateEmployeeResponse updateEmployee(@PathVariable UUID id,@Valid @RequestBody UpdateEmployeeRequest updateEmployeeRequest){
        return employeeUpdateService.updateEmployee(id, updateEmployeeRequest);
    }

    @GetMapping("/search")
    public List<EmployeeSearchResponse> searchEmployees(@RequestParam String q, @RequestParam(defaultValue = "5") int limit) {
        return  employeeService.searchEmployees(q, limit);
    }
}
