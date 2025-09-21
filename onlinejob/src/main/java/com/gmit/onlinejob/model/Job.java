package com.gmit.onlinejob.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class Job {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-incremented primary key
//    private Long id;
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false) // Many jobs belong to one company
//    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    private Company company;
//
//    private String jobname, description, start_date, end_date, status;
//    private double salary;
//    public Job() {
//        super();
//    }
//    public Job(Company company, String jobname, String description, String start_date, String end_date, String status,
//               double salary) {
//        super();
//        this.company = company;
//        this.jobname = jobname;
//        this.description = description;
//        this.start_date = start_date;
//        this.end_date = end_date;
//        this.status = status;
//        this.salary = salary;
//    }
//    public Job(Long id, Company company, String jobname, String description, String start_date, String end_date,
//               String status, double salary) {
//        super();
//        this.id = id;
//        this.company = company;
//        this.jobname = jobname;
//        this.description = description;
//        this.start_date = start_date;
//        this.end_date = end_date;
//        this.status = status;
//        this.salary = salary;
//    }
//    public Long getId() {
//        return id;
//    }
//    public void setId(Long id) {
//        this.id = id;
//    }
//    public Company getCompany() {
//        return company;
//    }
//    public void setCompany(Company company) {
//        this.company = company;
//    }
//    public String getJobname() {
//        return jobname;
//    }
//    public void setJobname(String jobname) {
//        this.jobname = jobname;
//    }
//    public String getDescription() {
//        return description;
//    }
//    public void setDescription(String description) {
//        this.description = description;
//    }
//    public String getStart_date() {
//        return start_date;
//    }
//    public void setStart_date(String start_date) {
//        this.start_date = start_date;
//    }
//    public String getEnd_date() {
//        return end_date;
//    }
//    public void setEnd_date(String end_date) {
//        this.end_date = end_date;
//    }
//    public String getStatus() {
//        return status;
//    }
//    public void setStatus(String status) {
//        this.status = status;
//    }
//    public double getSalary() {
//        return salary;
//    }
//    public void setSalary(double salary) {
//        this.salary = salary;
//    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-incremented primary key
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false) // Many jobs belong to one company
    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
    private Company company;

    private String jobname, description, start_date, end_date, status;
    private double salary;
    public Job() {
        super();
    }
    public Job(Company company, String jobname, String description, String start_date, String end_date, String status,
               double salary) {
        super();
        this.company = company;
        this.jobname = jobname;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
        this.salary = salary;
    }
    public Job(Long id, Company company, String jobname, String description, String start_date, String end_date,
               String status, double salary) {
        super();
        this.id = id;
        this.company = company;
        this.jobname = jobname;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
        this.salary = salary;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Company getCompany() {
        return company;
    }
    public void setCompany(Company company) {
        this.company = company;
    }
    public String getJobname() {
        return jobname;
    }
    public void setJobname(String jobname) {
        this.jobname = jobname;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getStart_date() {
        return start_date;
    }
    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }
    public String getEnd_date() {
        return end_date;
    }
    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public double getSalary() {
        return salary;
    }
    public void setSalary(double salary) {
        this.salary = salary;
    }

}
