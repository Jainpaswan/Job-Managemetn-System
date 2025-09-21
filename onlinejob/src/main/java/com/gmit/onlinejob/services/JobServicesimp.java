package com.gmit.onlinejob.services;

import java.util.List;

import com.gmit.onlinejob.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.gmit.onlinejob.model.Job;

@Service
public class JobServicesimp implements JobService {
	@Autowired
	private JobRepository jobRepository;

	@Override
	public Job addJob(Job job) {
		return jobRepository.save(job);
	}

	@Override
	public Job updateJob(Long id, Job job) {
		Job existing = jobRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Job not found"));
		existing.setJobname(job.getJobname());
		existing.setDescription(job.getDescription());
		existing.setStart_date(job.getStart_date());
		existing.setEnd_date(job.getEnd_date());
		existing.setStatus(job.getStatus());
		existing.setSalary(job.getSalary());
		return jobRepository.save(existing);
	}

	@Override
	public void deleteJob(Long id) {
		jobRepository.deleteById(id);
	}

	@Override
	public Job getJobById(Long id) {
		return jobRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Job not found"));
	}

	@Override
	public List<Job> getAllJobs() {
		return jobRepository.findAll();
	}

	@Override
	public List<Job> getJobsByCompany(Long companyId) {
		return jobRepository.findByCompanyId(companyId);
	}

	

	
	
}
