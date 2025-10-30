package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Company;
import org.springframework.security.core.userdetails.User;
import com.gmit.onlinejob.repository.CompanyRepository;
import com.gmit.onlinejob.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public CustomUserDetailsService(CompanyRepository companyRepository, UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Check if it's a company first
        return companyRepository.findByEmail(email)
                .<UserDetails>map(company -> new User(
                        company.getEmail(),
                        company.getPassword(),
                        Collections.singleton(new SimpleGrantedAuthority("ROLE_" + company.getRole()))
                ))
                // If not found, check in users
                .orElseGet(() -> userRepository.findByEmail(email)
                        .map(user -> new User(
                                user.getEmail(),
                                user.getPassword(),
                                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
                        ))
                        .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email))
                );
    }
}
