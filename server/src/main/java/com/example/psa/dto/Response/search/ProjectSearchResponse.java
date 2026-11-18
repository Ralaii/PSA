package com.example.psa.dto.Response.search;

import java.util.UUID;

public record ProjectSearchResponse(
        UUID id, String name, String projectNumber
) {
}
