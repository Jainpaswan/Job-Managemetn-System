package com.gmit.onlinejob.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String status = "Applied"; // default

    // 🔹 New editable fields
    private String resume;        // URL or path to uploaded file
    private String coverLetter;   // Optional message
    private String skills;        // Snapshot of skills during application

    private LocalDateTime appliedAt = LocalDateTime.now();
    private LocalDateTime updatedAt;

    public Application() {}

    public Application(Job job, User user) {
        this.job = job;
        this.user = user;
        this.status = "Applied";
        this.appliedAt = LocalDateTime.now();
    }

    // 🔹 Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getResume() { return resume; }
    public void setResume(String resume) { this.resume = resume; }

    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
