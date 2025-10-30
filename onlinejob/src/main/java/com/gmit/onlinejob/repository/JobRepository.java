package com.gmit.onlinejob.repository;

import com.gmit.onlinejob.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gmit.onlinejob.model.Job;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    // ✅ Find all jobs posted by a specific company
    List<Job> findByCompany(Company company);

    // ✅ Optional: Find jobs by status (e.g., "Open", "Closed")
    List<Job> findByStatus(String status);

    // ✅ Optional: Find jobs by name (for search features)
    List<Job> findByJobnameContainingIgnoreCase(String jobname);


    List<Job> findByCompanyId(Long companyId);

    List<Job> findByJobnameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String keyword, String keyword1);
}
