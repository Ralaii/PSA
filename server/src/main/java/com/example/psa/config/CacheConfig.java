package com.example.psa.config;

import com.example.psa.exception.RedisCacheErrorHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CachingConfigurer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
@RequiredArgsConstructor
public class CacheConfig implements CachingConfigurer {
    private final RedisCacheErrorHandler redisCacheErrorHandler;

    @Override
    public CacheErrorHandler errorHandler() {
        return redisCacheErrorHandler;
    }
}
