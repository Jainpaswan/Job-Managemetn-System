package com.gmit.onlinejob.service;

import com.gmit.onlinejob.model.Application;
import com.gmit.onlinejob.model.Job;
import com.gmit.onlinejob.model.User;
import com.gmit.onlinejob.repository.ApplicationRepository;
import com.gmit.onlinejob.repository.JobRepository;
import com.gmit.onlinejob.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Application> getApplicationsByUserEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return applicationRepository.findByUserId(userOpt.get().getId());
    }

    public Application updateApplication(Long id, Application updatedData) {
        Application existing = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // selectively update allowed fields
        if (updatedData.getResume() != null)
            existing.setResume(updatedData.getResume());

        if (updatedData.getCoverLetter() != null)
            existing.setCoverLetter(updatedData.getCoverLetter());

        if (updatedData.getSkills() != null)
            existing.setSkills(updatedData.getSkills());

        existing.setUpdatedAt(LocalDateTime.now());

        return applicationRepository.save(existing);
    }

    public String applyForJob(Long jobId, String userEmail, String resume, String coverLetter, String skills) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        Optional<Job> jobOpt = jobRepository.findById(jobId);

        if (userOpt.isEmpty() || jobOpt.isEmpty()) {
            return "User or Job not found.";
        }

        User user = userOpt.get();
        Job job = jobOpt.get();

        Optional<Application> existing = applicationRepository.findByJobIdAndUserId(jobId, user.getId());
        if (existing.isPresent()) {
            return "You have already applied for this job.";
        }

        Application application = new Application(job, user);
        application.setResume(resume);
        application.setCoverLetter(coverLetter);
        application.setSkills(skills);
        application.setStatus("Applied");
        application.setAppliedAt(LocalDateTime.now());

        applicationRepository.save(application);
        return "Applied successfully!";
    }
}
