package com.example.psa.dto.Response.employee;

import com.example.psa.entity.EmployeeAddress;
import com.example.psa.enums.AddressType;

import java.util.UUID;

public record AddressResponse(
        UUID id,
        AddressType addressType,
        String houseNum,
        String street,
        String subdivision,
        String barangay,
        String cityMunicipality,
        String province,
        String postalCode
) {
    public static AddressResponse from(EmployeeAddress a) {
        return new AddressResponse(
                a.getId(),
                a.getAddressType(),
                a.getHouseNum(),
                a.getStreet(),
                a.getSubdivision(),
                a.getBarangay(),
                a.getCityMunicipality(),
                a.getProvince(),
                a.getPostalCode());
    }
}