package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Company;
import com.gmit.onlinejob.model.Job;
import com.gmit.onlinejob.repository.CompanyRepository;
import com.gmit.onlinejob.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServicesimp implements JobService {

	private final JobRepository jobRepository;
	private final CompanyRepository companyRepository;

	@Autowired
	public JobServicesimp(JobRepository jobRepository, CompanyRepository companyRepository) {
		this.jobRepository = jobRepository;
		this.companyRepository = companyRepository;
	}

	@Override
	public Job createJob(Job job, Long companyId) {
		Company company = companyRepository.findById(companyId)
				.orElseThrow(() -> new RuntimeException("Company not found with ID: " + companyId));

		job.setCompany(company);
		if (job.getStatus() == null || job.getStatus().isBlank()) {
			job.setStatus("Open");
		}
		return jobRepository.save(job);
	}

	@Override
	public Job updateJob(Long id, Job job) {
		Job existing = jobRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Job not found with ID: " + id));

		existing.setJobname(job.getJobname());
		existing.setDescription(job.getDescription());
		existing.setStartDate(job.getStartDate());
		existing.setEndDate(job.getEndDate());
		existing.setStatus(job.getStatus());
		existing.setSalary(job.getSalary());

		return jobRepository.save(existing);
	}

	@Override
	public void deleteJob(Long id) {
		if (!jobRepository.existsById(id)) {
			throw new RuntimeException("Job not found with ID: " + id);
		}
		jobRepository.deleteById(id);
	}

	@Override
	public Job getJobById(Long id) {
		return jobRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Job not found with ID: " + id));
	}

	@Override
	public List<Job> getAllJobs() {
		return jobRepository.findAll();
	}

	@Override
	public List<Job> getJobsByCompany(Long companyId) {
		return jobRepository.findByCompanyId(companyId);
	}

	@Override
	public List<Job> searchJobs(String keyword) {
		return jobRepository.findByJobnameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
	}
}
