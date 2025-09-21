package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Company;
import com.gmit.onlinejob.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CompanyServiceImplement implements CompanyService{

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Company registerCompany(Company company)
    {
        String hashedPassword = passwordEncoder.encode(company.getPassword());
        company.setPassword(hashedPassword);
        if (company.getRole() == null || company.getRole().isBlank()) {
            company.setRole("ROLE_USER");   // ✅ default role
        }
        return companyRepository.save(company);
    }

    @Override
    public Company updateCompany(Long id, Company company) {
        Company existing = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        existing.setName(company.getName());
        existing.setEmail(company.getEmail());
        existing.setPassword(company.getPassword());
        existing.setWebsite(company.getWebsite());
        existing.setContact(company.getContact());
        existing.setLocation(company.getLocation());
        return companyRepository.save(existing);
    }

    @Override
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }

    @Override
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Company login(String email, String password) {
        return companyRepository.findByEmail(email)
                .filter(c -> passwordEncoder.matches(password, c.getPassword())) // for demo (plain text)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
}
