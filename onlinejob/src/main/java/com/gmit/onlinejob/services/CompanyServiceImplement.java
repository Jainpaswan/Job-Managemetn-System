package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Company;
import com.gmit.onlinejob.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImplement implements CompanyService {

    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CompanyServiceImplement(CompanyRepository companyRepository, PasswordEncoder passwordEncoder) {
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Register a new company with encrypted password and default role.
     */
    @Override
    public Company registerCompany(Company company) {
        // Prevent duplicate email registration
        companyRepository.findByEmail(company.getEmail()).ifPresent(c -> {
            throw new RuntimeException("Email already registered: " + company.getEmail());
        });

        // Encrypt password
        company.setPassword(passwordEncoder.encode(company.getPassword()));

        // Set default role if not provided
        if (company.getRole() == null) {
            company.setRole(Company.Role.COMPANY);
        }

        return companyRepository.save(company);
    }

    /**
     * Update company details. Password is only re-encoded if changed.
     */
    @Override
    public Company updateCompany(Long id, Company company) {
        Company existing = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));

        existing.setName(company.getName());
        existing.setEmail(company.getEmail());
        existing.setWebsite(company.getWebsite());
        existing.setContact(company.getContact());
        existing.setLocation(company.getLocation());

        // Only update password if a new one is provided
        if (company.getPassword() != null && !company.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(company.getPassword()));
        }

        return companyRepository.save(existing);
    }

    /**
     * Delete company by ID.
     */
    @Override
    public void deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company not found with id: " + id);
        }
        companyRepository.deleteById(id);
    }

    /**
     * Fetch a single company by ID.
     */
    @Override
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
    }

    /**
     * Fetch all registered companies.
     */
    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    /**
     * Authenticate company login.
     */
    @Override
    public Company login(String email, String password) {
        Company company = companyRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, company.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return company;
    }
}
