package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Company;
import com.gmit.onlinejob.repository.CompanyRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final CompanyRepository repo;

    public CustomUserDetailsService(CompanyRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws
            UsernameNotFoundException {
        Company company = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        return new org.springframework.security.core.userdetails.User(
                company.getEmail(),
                company.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(company.getRole()))
        );
    }
}
