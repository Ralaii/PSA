package com.example.psa.controller;

import com.example.psa.dto.Request.UpdateEmployeeRequest;
import com.example.psa.dto.Response.EmployeeDetailResponse;
import com.example.psa.dto.Response.EmployeeSummaryResponse;
import com.example.psa.dto.Response.PageResponse;
import com.example.psa.dto.Response.UpdateEmployeeResponse;
import com.example.psa.service.EmployeeService;
import com.example.psa.service.EmployeeUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;
    private final EmployeeUpdateService employeeUpdateService;

    @GetMapping
    public PageResponse<EmployeeSummaryResponse> getEmployees(@PageableDefault(size = 25, sort = "employeeNumber")Pageable pageable){
        return employeeService.getEmployees(pageable);
    }

    @GetMapping("/{id}")
    public EmployeeDetailResponse getEmployee(@PathVariable UUID id){
        return employeeService.getEmployeeDetails(id);
    }

    @PatchMapping("/{id}")
    public UpdateEmployeeResponse updateEmployee(@RequestBody UUID id, UpdateEmployeeRequest updateEmployeeRequest){
        return employeeUpdateService.updateEmployee(id, updateEmployeeRequest);
    }

}
