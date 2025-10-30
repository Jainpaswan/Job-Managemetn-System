package com.gmit.onlinejob.repository;

import com.gmit.onlinejob.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,Long> {
    Optional<Application> findByJobIdAndUserId(Long jobId, Long userId);

    List<Application> findByUserId(Long userid);


}
