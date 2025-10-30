package com.gmit.onlinejob.controller;

import com.gmit.onlinejob.model.Application;
import com.gmit.onlinejob.model.Job;
import com.gmit.onlinejob.model.User;
import com.gmit.onlinejob.repository.ApplicationRepository;
import com.gmit.onlinejob.repository.JobRepository;
import com.gmit.onlinejob.repository.UserRepository;
import com.gmit.onlinejob.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gmit.onlinejob.service.ApplicationService;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

	private final JobService jobService;

	@Autowired
	public JobController(JobService jobService) {
		this.jobService = jobService;
	}

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ApplicationRepository applicationRepository;

	@Autowired
	private ApplicationService applicationService;
	/**
	 * ✅ Create a new job under a specific company.
	 */
	@PostMapping("/create/{companyId}")
	public ResponseEntity<?> createJob(@RequestBody Job job, @PathVariable Long companyId) {
		try {
			Job createdJob = jobService.createJob(job, companyId);
			return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ErrorResponse("Failed to create job", e.getMessage()));
		}
	}

	/**
	 * ✅ Update an existing job.
	 */
	@PutMapping("/{id}")
	public ResponseEntity<?> updateJob(@PathVariable Long id, @RequestBody Job job) {
		try {
			Job updatedJob = jobService.updateJob(id, job);
			return ResponseEntity.ok(updatedJob);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ErrorResponse("Failed to update job", e.getMessage()));
		}
	}

	/**
	 * ✅ Delete a job by ID.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteJob(@PathVariable Long id) {
		try {
			jobService.deleteJob(id);
			return ResponseEntity.ok(new MessageResponse("Job deleted successfully."));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ErrorResponse("Failed to delete job", e.getMessage()));
		}
	}

	/**
	 * ✅ Get job details by ID.
	 */
	@GetMapping("/{id}")
	public ResponseEntity<?> getJobById(@PathVariable Long id) {
		try {
			Job job = jobService.getJobById(id);
			return ResponseEntity.ok(job);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ErrorResponse("Job not found", e.getMessage()));
		}
	}

	/**
	 * ✅ Get all job postings.
	 */
	@GetMapping
	public ResponseEntity<List<Job>> getAllJobs() {
		return ResponseEntity.ok(jobService.getAllJobs());
	}

	/**
	 * ✅ Get all jobs posted by a specific company.
	 */
	@GetMapping("/company/{companyId}")
	public ResponseEntity<?> getJobsByCompany(@PathVariable Long companyId) {
		try {
			List<Job> jobs = jobService.getJobsByCompany(companyId);
			return ResponseEntity.ok(jobs);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ErrorResponse("Failed to fetch jobs", e.getMessage()));
		}
	}

	/**
	 * ✅ Search for jobs by keyword.
	 */
	@GetMapping("/search")
	public ResponseEntity<List<Job>> searchJobs(@RequestParam("keyword") String keyword) {
		return ResponseEntity.ok(jobService.searchJobs(keyword));
	}

	//Apply for job
//	@PostMapping("/{id}/apply")
//	public ResponseEntity<?> applyForJob(@PathVariable Long id, @RequestBody(required = false) Map<String, String> request) {
//		try {
//			String userEmail = request != null ? request.get("email") : null;
//			if (userEmail == null) {
//				return ResponseEntity.badRequest().body("User email is required.");
//			}
//
//			Optional<User> userOpt = userRepository.findByEmail(userEmail);
//			Optional<Job> jobOpt = jobRepository.findById(id);
//
//			if (userOpt.isEmpty() || jobOpt.isEmpty()) {
//				return ResponseEntity.status(404).body("User or Job not found");
//			}
//
//			User user = userOpt.get();
//			Job job = jobOpt.get();
//
//			// check if user already applied
//			if (applicationRepository.findByJobIdAndUserId(job.getId(), user.getId()).isPresent()) {
//				return ResponseEntity.status(409).body("Already applied for this job");
//			}
//
//			Application application = new Application(job, user);
//			applicationRepository.save(application);
//
//			return ResponseEntity.ok("Applied successfully!");
//		} catch (Exception e) {
//			e.printStackTrace();
//			return ResponseEntity.internalServerError().body("Error applying for job");
//		}
//	}

//	@PostMapping("/{id}/apply")
//	public ResponseEntity<?> applyForJob(
//			@PathVariable Long id,
//			@RequestBody Map<String, String> request) {
//		try {
//			String userEmail = request.get("email");
//			String resume = request.get("resume");
//			String coverLetter = request.get("coverLetter");
//			String skills = request.get("skills");
//
//			if (userEmail == null) {
//				return ResponseEntity.badRequest().body("User email is required.");
//			}
//
//			Optional<User> userOpt = userRepository.findByEmail(userEmail);
//			Optional<Job> jobOpt = jobRepository.findById(id);
//
//			if (userOpt.isEmpty() || jobOpt.isEmpty()) {
//				return ResponseEntity.status(404).body("User or Job not found");
//			}
//
//			User user = userOpt.get();
//			Job job = jobOpt.get();
//
//			if (applicationRepository.findByJobIdAndUserId(job.getId(), user.getId()).isPresent()) {
//				return ResponseEntity.status(409).body("Already applied for this job");
//			}
//
//			Application application = new Application(job, user);
//			application.setResume(resume);
//			application.setCoverLetter(coverLetter);
//			application.setSkills(skills);
//
//			applicationRepository.save(application);
//
//			return ResponseEntity.ok("Applied successfully!");
//		} catch (Exception e) {
//			e.printStackTrace();
//			return ResponseEntity.internalServerError().body("Error applying for job");
//		}
//	}


	@PostMapping(path = "/{jobId}/apply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> applyForJob(
			@PathVariable Long jobId,
			@RequestParam("email") String email,
			@RequestParam("skills") String skills,
			@RequestParam(value = "resume", required = false) MultipartFile resumeFile,
			@RequestParam(value = "coverLetter", required = false) MultipartFile coverLetterFile
	) {
		try {
			// 📂 Folder to save uploaded PDFs
			String uploadDir = "uploads/";
			File directory = new File(uploadDir);
			if (!directory.exists()) {
				directory.mkdirs();
			}

			String resumePath = null;
			String coverLetterPath = null;

			// Save Resume
			if (resumeFile != null && !resumeFile.isEmpty()) {
				if (!resumeFile.getOriginalFilename().endsWith(".pdf")) {
					return ResponseEntity.badRequest().body("Resume must be a PDF file!");
				}
				String resumeFileName = System.currentTimeMillis() + "_resume_" + resumeFile.getOriginalFilename();
				Path filePath = Paths.get(uploadDir, resumeFileName);
				resumeFile.transferTo(filePath);
				resumePath = filePath.toString();
			}

			// Save Cover Letter
			if (coverLetterFile != null && !coverLetterFile.isEmpty()) {
				if (!coverLetterFile.getOriginalFilename().endsWith(".pdf")) {
					return ResponseEntity.badRequest().body("Cover letter must be a PDF file!");
				}
				String coverLetterFileName = System.currentTimeMillis() + "_cover_" + coverLetterFile.getOriginalFilename();
				Path filePath = Paths.get(uploadDir, coverLetterFileName);
				coverLetterFile.transferTo(filePath);
				coverLetterPath = filePath.toString();
			}

			// Call Service
			String response = applicationService.applyForJob(jobId, email, resumePath, coverLetterPath, skills);
			if (response.contains("successfully")) {
				return ResponseEntity.ok(response);
			} else {
				return ResponseEntity.badRequest().body(response);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("Error applying for job");
		}
	}




	// ✅ Utility response classes for structured responses
	private record MessageResponse(String message) {}
	private record ErrorResponse(String error, String details) {}
}
