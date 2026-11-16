package com.example.psa.service;

import com.example.psa.exception.RedisCacheErrorHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.time.Duration;
import java.util.function.Supplier;

@Component
@RequiredArgsConstructor
public class RedisCache {
    private final StringRedisTemplate redis;
    private final ObjectMapper objectMapper;
    private final RedisCacheErrorHandler errorHandler;

    public <T> T getOrLoad(String cacheName, String key, TypeReference<T> typeRef, Duration ttl, Supplier<T> dbFallback) {
        String fullKey = cacheName + "::" + key;

        try {
            String json = redis.opsForValue().get(fullKey);
            if (json != null) {
                return objectMapper.readValue(json, typeRef);
            }
        } catch (Exception e) {
            errorHandler.handleManualError("GET", new RuntimeException (e), cacheName, key);
        }

        T freshData = dbFallback.get();

        if (freshData != null) {
            try {
                String json = objectMapper.writeValueAsString(freshData);
                redis.opsForValue().set(fullKey, json, ttl);
            } catch (Exception e) {
                errorHandler.handleManualError("PUT", new RuntimeException (e), cacheName, key);
            }
        }
        return freshData;
    }
}
