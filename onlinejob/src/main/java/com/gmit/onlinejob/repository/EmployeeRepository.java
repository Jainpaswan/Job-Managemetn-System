package com.gmit.onlinejob.repository;

import com.gmit.onlinejob.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    //We get default CRUD frunctions
    //-> save(), fetchAll(), getById(), delete()

    //But now suppose we need to find the data from employeeName
    //So we need to write custom Query
    @Query("SELECT e FROM Employee e WHERE e.employeeName Like %:name%")
    List<Employee> getEmployeeByName(@Param("name") String name);

    @Query("SELECT e FROM Employee e WHERE e.employeeid = :employeeid AND e.password = :password")
    Employee employeeLogin(@Param("employeeid") Long employeeid, @Param("password") String password);
}
