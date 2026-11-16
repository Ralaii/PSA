package com.example.psa.security;

import com.example.psa.entity.AppUser;
import com.example.psa.enums.AccountStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Getter
public class CustomUserDetails implements UserDetails {
    private final AppUser appUser;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + appUser.getRole().name()));
    }

    @Override
    public String getPassword() {
        return appUser.getPassword();
    }

    @Override
    public String getUsername() {
        return appUser.getUsername();
    }

    @Override
    public boolean isEnabled() {
        return appUser.getStatus() == AccountStatus.ACTIVE;
    }

    @Override
    public boolean isAccountNonLocked() {
        return appUser.getStatus() != AccountStatus.SUSPENDED;
    }

    public boolean isPending() {
        return appUser.getStatus() == AccountStatus.PENDING;
    }
}
