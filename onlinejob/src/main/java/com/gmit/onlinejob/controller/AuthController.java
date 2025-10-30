package com.gmit.onlinejob.controller;

import com.gmit.onlinejob.model.User;
import com.gmit.onlinejob.model.Company;
import com.gmit.onlinejob.repository.UserRepository;
import com.gmit.onlinejob.repository.CompanyRepository;
import com.gmit.onlinejob.services.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    // ✅ Login endpoint (works for both users and companies)
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        try {
            // Authenticate credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            // Get UserDetails and generate JWT
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);

            // Prepare response map
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);

            // Determine if it's a user or company and add that info
            userRepository.findByEmail(email).ifPresentOrElse(
                    user -> response.put("user", user),
                    () -> companyRepository.findByEmail(email).ifPresent(company -> response.put("company", company))
            );

            return response;

        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
