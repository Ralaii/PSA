package com.example.psa.config;

import com.example.psa.exception.AccountPendingException;
import com.example.psa.security.CustomUserDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.security.auth.login.AccountExpiredException;

@Configuration
public class AuthProviderConfig {

    @Bean
    public AuthenticationProvider  authenticationProvider(UserDetailsService userDetailsService,
                                                          PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        provider.setPreAuthenticationChecks(user -> {
            if(user instanceof CustomUserDetails cud && cud.isPending()) {
                throw new AccountPendingException("Account pending approval");
            }
            if(!user.isAccountNonLocked()) {
                throw new LockedException("Account locked");
            }
            if(!user.isEnabled()) {
                throw new DisabledException("Account disabled");
            }
        });
        return provider;
    }
}
