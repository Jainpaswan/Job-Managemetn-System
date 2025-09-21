package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.Employee;
import com.gmit.onlinejob.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        // TODO Auto-generated method stub
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> fetchAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        // TODO Auto-generated method stub
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            return employee.get();
        }
        return null;
    }


    @Override
    public Employee updateEmployeeById(Long id, Employee employee) {
        Optional<Employee> emp = employeeRepository.findById(id);
        if (emp.isPresent()) {
            Employee e = emp.get();
            e.setEmployeeName(employee.getEmployeeName());
            e.setEmployeeSalary(employee.getEmployeeSalary());

            return employeeRepository.save(e);
        }
        return null;
    }

    @Override
    public String deleteDepartmentById(Long id) {
        // TODO Auto-generated method stub
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            employeeRepository.deleteById(id);
            return "Employee Data has been deleted...!!!";
        }
        return "Employee Id not exists";
    }

    @Override
    public List<Employee> getEmployeeByName(String employeeName) {
        // TODO Auto-generated method stub
        return employeeRepository.getEmployeeByName(employeeName);
    }

    @Override
    public Employee employeeLogin(Employee employee) {
        // TODO Auto-generated method stub
        return employeeRepository.employeeLogin(employee.getEmployeeid(), employee.getPassword());
    }
}
