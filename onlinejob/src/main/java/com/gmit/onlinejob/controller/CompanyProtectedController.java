package com.gmit.onlinejob.controller;

import com.gmit.onlinejob.error.ApiResponse;
import com.gmit.onlinejob.model.Company;
import com.gmit.onlinejob.services.CompanyService;
import com.gmit.onlinejob.services.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/companies/auth")
public class CompanyProtectedController {
    @Autowired
    private CompanyService companyService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;


    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            List<Company> companies = companyService.getAllCompanies();

            return ResponseEntity.ok(companies); // 200 OK
        } catch (Exception e) {
            ApiResponse response = new ApiResponse(false, e.getMessage());
            return ResponseEntity.status(500).body(response); // Internal Server Error
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            companyService.deleteCompany(id);
            response.put("status", true);
            response.put("message", "Company deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("status", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCompany(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Company company = companyService.getCompanyById(id);
            response.put("status", true);
            response.put("data", company);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("status", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
