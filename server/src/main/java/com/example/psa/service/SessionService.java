package com.example.psa.service;

import com.example.psa.entity.AppUser;
import com.example.psa.enums.AccountStatus;
import com.example.psa.repository.SessionRepository;
import com.example.psa.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;

    @Value("${session.idle-timeout-minutes:240}")
    private long idleTimeoutMinutes;

    @Transactional
    public Optional<AppUser> refresh(UUID sessionId){
        Instant now = Instant.now();

        return sessionRepository.findById(sessionId)
                .filter(s -> s.getRevokedAt() == null)
                .filter(s -> s.getExpiresAt().isAfter(now))
                .filter(s -> s.getLastSeenAt()
                        .plus(idleTimeoutMinutes, ChronoUnit.MINUTES)
                        .isAfter(now))
                .filter(s -> s.getUser().getStatus() == AccountStatus.ACTIVE)
                .map(s -> {
                    s.setLastSeenAt(now);
                    return s.getUser();
    });
    }

    public boolean isSessionActive(UUID sessionId){
        return sessionRepository.existsByIdAndRevokedAtIsNull(sessionId);
    }
}
