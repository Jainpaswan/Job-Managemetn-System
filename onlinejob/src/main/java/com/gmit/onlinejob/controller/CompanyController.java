package com.gmit.onlinejob.controller;

import com.gmit.onlinejob.model.Company;
import com.gmit.onlinejob.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // ✅ Register a new company
    @PostMapping("/register")
    public ResponseEntity<Company> registerCompany(@RequestBody Company company) {
        Company savedCompany = companyService.registerCompany(company);
        return ResponseEntity.ok(savedCompany);
    }

    // ✅ Update company details
    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company company) {
        Company updatedCompany = companyService.updateCompany(id, company);
        return ResponseEntity.ok(updatedCompany);
    }

    // ✅ Delete a company by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Get company by ID
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        Company company = companyService.getCompanyById(id);
        return ResponseEntity.ok(company);
    }

    // ✅ Get all companies
    @GetMapping("/getAll")
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }
}
