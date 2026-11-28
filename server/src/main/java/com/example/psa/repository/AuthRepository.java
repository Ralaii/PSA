package com.example.psa.repository;

import com.example.psa.entity.User;
import com.example.psa.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public interface AuthRepository extends JpaRepository<User, UUID> {

    @Modifying
    @Query("""
        update UserSession s
        set s.revokedAt = :now
        where s.id = :sessionId and s.revokedAt is NULL
    """)
    int revokeSession(@Param("sessionId") UUID sessionId, @Param("now")Instant now);
}
