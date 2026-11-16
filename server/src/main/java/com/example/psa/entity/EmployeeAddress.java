package com.example.psa.entity;

import com.example.psa.enums.AddressType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "employee_address")
public class EmployeeAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Enumerated(EnumType.STRING)
    @Column(name = "address_type")
    private AddressType addressType;

    @Column(name = "house_num")
    private String houseNum;

    @Column(name = "street")
    private String street;

    @Column(name = "subdivision")
    private String subdivision;

    @Column(name = "barangay")
    private String barangay;

    @Column(name = "city_municipality")
    private String cityMunicipality;

    @Column(name = "province")
    private String province;

    @Column(name = "postal_code")
    private String postalCode;
}
