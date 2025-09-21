package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Employee;

import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);

    List<Employee> fetchAllEmployees();

    List<Employee> getEmployeeByName(String employeeName);

    Employee getEmployeeById(Long id);

    Employee employeeLogin(Employee employee);

    Employee updateEmployeeById(Long id, Employee employee);

    String deleteDepartmentById(Long id);
}
