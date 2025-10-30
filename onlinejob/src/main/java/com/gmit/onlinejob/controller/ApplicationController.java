package com.gmit.onlinejob.controller;

import com.gmit.onlinejob.model.Application;
import com.gmit.onlinejob.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/user")
    public ResponseEntity<?> getUserApplications(@RequestParam String email) {
        try {
            List<Application> applications = applicationService.getApplicationsByUserEmail(email);
            if (applications.isEmpty()) {
                return ResponseEntity.ok("No job applications found for this user.");
            }
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error fetching job applications.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(
            @PathVariable Long id,
            @RequestBody Application updatedApplication) {

        Application app = applicationService.updateApplication(id, updatedApplication);
        return ResponseEntity.ok(app);
    }

}
