package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Job;

import java.util.List;

public interface JobService {
    Job addJob(Job job);
    Job updateJob(Long id, Job job);
    void deleteJob(Long id);
    Job getJobById(Long id);
    List<Job> getAllJobs();
    List<Job> getJobsByCompany(Long companyId);
}
