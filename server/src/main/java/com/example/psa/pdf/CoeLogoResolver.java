package com.example.psa.pdf;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class CoeLogoResolver {
    private static final String DIR = "pdf-assets/";

    private static final Map<String, String> FOOTER_LOGOS = Map.of(
            "default", "footer-default.png"
    );

    private static final Map<String, String> MIME_TYPES = Map.of(
            "png", "image/png",
            "jpg", "image/jpeg",
            "jpeg", "image/jpeg",
            "gif", "image/gif"
    );

    private final Map<String, String> cache = new ConcurrentHashMap<>();

    public String headerLeft() {
        return load("psa-logo.png");
    }

    public String headerRight() {
        return load("bagong-pilipinas-logo.png");
    }

    public String footerQr() {
        return load("qr-placeholder.png");
    }

    public String footer(String key) {
        String name = (key == null || key.isBlank()) ? "default" : key;
        String file = FOOTER_LOGOS.get(name);
        if (file == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown footer logo: " + name);
        }
        return load(file);
    }

    private String load(String file) {
        return cache.computeIfAbsent(file, f -> {
            try (InputStream in = new ClassPathResource(DIR + f).getInputStream()) {
                return "data:" + mimeType(f) + ";base64,"
                        + Base64.getEncoder().encodeToString(in.readAllBytes());
            } catch (IOException e) {
                throw new IllegalStateException("Could not load logo: " + DIR + f, e);
            }
        });
    }

    private String mimeType(String file) {
        int dot = file.lastIndexOf('.');
        String ext = dot >= 0 ? file.substring(dot + 1).toLowerCase() : "";
        String type = MIME_TYPES.get(ext);
        if (type == null) {
            throw new IllegalArgumentException("Unsupported logo type: " + file);
        }
        return type;
    }
}