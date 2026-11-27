package com.example.psa.controller;

import com.example.psa.dto.pdf.CoeRequest;
import com.example.psa.service.HrService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hr/preview-coe")
@RequiredArgsConstructor
public class HrController {
    private final HrService hrService;

    @PostMapping(value = "/{employeeNumber}/preview", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> previewHtml(@PathVariable String employeeNumber,
                                              @Valid @RequestBody CoeRequest request) {
        byte[] pdf = hrService.generateCoePdf(employeeNumber, request);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"coe.pdf\"")
                .body(pdf);
    }
}
