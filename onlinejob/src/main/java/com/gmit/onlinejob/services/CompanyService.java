package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Company;

import java.util.List;


public interface CompanyService {

    Company registerCompany(Company company);
    Company updateCompany(Long id, Company company);
    void deleteCompany(Long id);
    Company getCompanyById(Long id);
    List<Company> getAllCompanies();
    Company login(String email, String password);
}
