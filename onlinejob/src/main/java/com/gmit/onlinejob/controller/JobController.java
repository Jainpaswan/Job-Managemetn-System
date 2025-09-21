package com.gmit.onlinejob.controller;

import java.util.List;

import com.gmit.onlinejob.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.gmit.onlinejob.model.Job;


@RestController
@RequestMapping("/jobs")
public class JobController {
	@Autowired
	private JobService jobService;

	@PostMapping("/addJob")
	public Job addJob(@RequestBody Job job) {
		return jobService.addJob(job);
	}

	@PutMapping("updateJob/{id}")
	public Job updateJob(@PathVariable Long id, @RequestBody Job job) {
		return jobService.updateJob(id, job);
	}

	@DeleteMapping("deleteJob/{id}")
	public String deleteJob(@PathVariable Long id) {
		jobService.deleteJob(id);
		return "Job deleted successfully";
	}

	@GetMapping("getJob/{id}")
	public Job getJob(@PathVariable Long id) {
		return jobService.getJobById(id);
	}

	@GetMapping("/getAllJobs")
	public List<Job> getAllJobs() {
		return jobService.getAllJobs();
	}

	@GetMapping("/getAllJobsByCompanyId/{companyId}")
	public List<Job> getJobsByCompany(@PathVariable Long companyId) {
		return jobService.getJobsByCompany(companyId);
	}
}
