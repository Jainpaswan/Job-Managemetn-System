package com.gmit.onlinejob.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Company {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false,unique = true,length = 100)
//    private String email;
//
//    @Column(nullable = false,length = 100)
//    private String name;
//
//    @Column(length = 150)
//    private String website;
//
//    @Column(nullable = false,length = 255)
//    private String password;
//
//    @Column(nullable = false)
//    private String contact;
//
//    @Column(nullable = false,length = 150)
//    private String location;
//
//    public Company(){ super();}
//
//    public Company(Long id, String email, String name, String website, String password, String contact, String location) {
//        this.id = id;
//        this.email = email;
//        this.name = name;
//        this.website = website;
//        this.password = password;
//        this.contact = contact;
//        this.location = location;
//    }
//
//    public Company(String email, String name, String website, String password, String contact, String location) {
//        this.email = email;
//        this.name = name;
//        this.website = website;
//        this.password = password;
//        this.contact = contact;
//        this.location = location;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getWebsite() {
//        return website;
//    }
//
//    public void setWebsite(String website) {
//        this.website = website;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getContact() {
//        return contact;
//    }
//
//    public void setContact(String contact) {
//        this.contact = contact;
//    }
//
//    public String getLocation() {
//        return location;
//    }
//
//    public void setLocation(String location) {
//        this.location = location;
//    }
//
//    public String getRole() {
//        return null;
//    }
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
    private String email, name, password, website, contact, location;
    private String role;
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getWebsite() {
        return website;
    }
    public void setWebsite(String website) {
        this.website = website;
    }
    public String getContact() {
        return contact;
    }
    public void setContact(String contact) {
        this.contact = contact;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public Company() {
        super();
    }
    public Company(String email, String name, String password, String website, String contact, String location) {
        super();
        this.email = email;
        this.name = name;
        this.password = password;
        this.website = website;
        this.contact = contact;
        this.location = location;
    }
    public Company(Long id, String email, String name, String password, String website, String contact,
                   String location) {
        super();
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.website = website;
        this.contact = contact;
        this.location = location;
    }
}
