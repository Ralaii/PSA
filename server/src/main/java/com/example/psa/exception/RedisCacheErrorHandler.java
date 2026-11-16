package com.example.psa.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.dao.QueryTimeoutException;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RedisCacheErrorHandler implements CacheErrorHandler {

    private boolean isConnectionProblem(Throwable e) {
        for (Throwable t = e; t != null; t = t.getCause()) {
            if (t instanceof RedisConnectionFailureException || t instanceof QueryTimeoutException) return  true;
        }
        return false;
    }

    public void handleManualError(String operation, RuntimeException e, String cache, Object key) {
        if (isConnectionProblem(e)) {
            log.error("Redis unavailable, cache {} skipped [{}::{}]: {}", operation, cache, key, e.getMessage());
        } else {
            log.error("Cache {} failed [{}::{}]", operation, cache, key, e);
        }
    }

    @Override
    public void handleCacheGetError(RuntimeException e, Cache cache, Object key) {
        handleManualError("GET", e, cache.getName(), key);
    }

    @Override
    public void handleCachePutError(RuntimeException e, Cache cache, Object key, Object value) {
        handleManualError("PUT", e, cache.getName(), key);
    }

    @Override
    public void handleCacheEvictError(RuntimeException e, Cache cache, Object key) {
        handleManualError("EVICT", e, cache.getName(), key);
    }

    @Override
    public void handleCacheClearError(RuntimeException e, Cache cache) {
        handleManualError("CLEAR", e, cache.getName(), "*");
    }

}
