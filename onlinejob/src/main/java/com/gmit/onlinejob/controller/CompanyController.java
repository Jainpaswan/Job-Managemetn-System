package com.gmit.onlinejob.controller;

import com.gmit.onlinejob.model.AuthRequest;
import com.gmit.onlinejob.model.AuthResponse;
import com.gmit.onlinejob.model.Company;
import com.gmit.onlinejob.services.CompanyService;
import com.gmit.onlinejob.services.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500/", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public Company register(@RequestBody Company company) {
        return companyService.registerCompany(company);
    }

    /*
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Company company) {
        Map<String, Object> response = new HashMap<>();
        try {
            Company details = companyService.login(company.getEmail(), company.getPassword());

            response.put("status", true);
            response.put("data", details);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("status", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    */

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(),req.getPassword()));
        UserDetails ud = (UserDetails) auth.getPrincipal();
        String jwt = jwtUtil.generateToken(ud);
        return ResponseEntity.ok(new AuthResponse(jwt));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Company company) {
        Map<String, Object> response = new HashMap<>();
        try {
            Company updated = companyService.updateCompany(id, company);
            response.put("status", true);
            response.put("data", updated);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("status", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }






}
