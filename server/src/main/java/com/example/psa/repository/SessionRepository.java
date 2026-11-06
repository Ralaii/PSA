package com.example.psa.repository;

import com.example.psa.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

public interface SessionRepository extends JpaRepository<UserSession, UUID> {

//    REVOKING USER ACCESS
    @Modifying
    @Transactional
    @Query("update UserSession s set s.revokedAt = :now " +
            "where s.user.id = :userId and s.revokedAt is null")
    int revokeAllForUser(@Param("userId") UUID userId, @Param("now") Instant now);

    boolean existsByIdAndRevokedAtIsNull(UUID sessionId);
}