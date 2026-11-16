package com.example.psa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "sessions")
@Getter
@Setter
public class UserSession {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AppUser user;

    private Instant createdAt = Instant.now();
    private Instant expiresAt;
    private Instant lastSeenAt =  Instant.now();
    private Instant revokedAt;
}
