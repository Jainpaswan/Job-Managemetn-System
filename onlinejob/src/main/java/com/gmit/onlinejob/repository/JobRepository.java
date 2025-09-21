package com.gmit.onlinejob.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gmit.onlinejob.model.Job;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCompanyId(Long companyId);


}
