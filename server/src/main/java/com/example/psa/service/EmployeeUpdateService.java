package com.example.psa.service;

import com.example.psa.dto.request.UpdateEmployeeRequest;
import com.example.psa.dto.response.employee.UpdateEmployeeResponse;
import com.example.psa.entity.Employee;
import com.example.psa.entity.EmployeePosition;
import com.example.psa.exception.DuplicateResourceException;
import com.example.psa.repository.EmployeePositionRepository;
import com.example.psa.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
public class EmployeeUpdateService {
    private final EmployeeRepository employeeRepository;
    private final EmployeePositionRepository employeePositionRepository;
    private final RedisCache redisCache;

    @Transactional
    @PreAuthorize("hasAnyRole ('ADMIN', 'HR')")
    @CacheEvict(value = "employee", key = "#id")
    public UpdateEmployeeResponse updateEmployee(UUID id, UpdateEmployeeRequest req) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        applyUniqueFields(employee, req);
        applyRequiredFields(employee, req);
        applyOptionalFields(employee, req);

        redisCache.evictAll("employeeList");
        return UpdateEmployeeResponse.from(employee);
    }

    private void applyUniqueFields(Employee e, UpdateEmployeeRequest req) {
        if (req.employeeNum() != null) {
            String number =  req.employeeNum().trim();
            if (!number.equals(e.getEmployeeNumber()) && employeeRepository.existsByEmployeeNumber(number)) {
                throw new DuplicateResourceException("Employee number already exists");
            }
            e.setEmployeeNumber(number);
        }

        if (req.email() != null) {
            String email = req.email().trim();
            if (!email.equals(e.getEmail()) && employeeRepository.existsByEmail(email)) {
                throw new DuplicateResourceException("Email already exists");
            }
            e.setEmail(email);
        }
    }

    private void applyOptionalFields(Employee e, UpdateEmployeeRequest req) {
        setOptionalIfPresent(req.middleName(), e::setMiddleName);
        setOptionalIfPresent(req.pagibigNum(), e::setPagibigNum);
        setOptionalIfPresent(req.philhealthNum(), e::setPhilhealthNum);
        setOptionalIfPresent(req.philsisNum(), e::setPhilsysNum);
        setOptionalIfPresent(req.tinNum(), e::setTinNum);
        setOptionalIfPresent(req.telephoneNum(), e::setTelephoneNum);
        setOptionalIfPresent(req.phoneNum(), e::setPhoneNum);
    }

    private void applyRequiredFields(Employee e, UpdateEmployeeRequest req) {
        setTrimmedIfPresent(req.firstName(), e::setFirstName);
        setTrimmedIfPresent(req.lastName(), e::setLastName);
        setIfPresent(req.birthDate(), e::setBirthDate);
        setIfPresent(req.civilStatus(), e::setCivilStatus);
        setIfPresent(req.status(), e::setStatus);

        if (req.positionId() != null) {
            EmployeePosition position = employeePositionRepository.findById(req.positionId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee position not found"));
            e.setPosition(position);
        }
    }

    private <T> void setIfPresent(T value, Consumer<T> setter) {
        if (value != null) setter.accept(value);
    }

    private void setTrimmedIfPresent(String value, Consumer<String> setter) {
        if (value != null) setter.accept(value.trim());
    }

    private void setOptionalIfPresent(String value, Consumer<String> setter) {
        if (value != null) {
            String t = value.trim();
            setter.accept(t.isBlank() ? null : t);
        }
    }
}
