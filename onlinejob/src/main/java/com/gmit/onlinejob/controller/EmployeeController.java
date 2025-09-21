package com.gmit.onlinejob.controller;

import com.gmit.onlinejob.error.ApiResponse;
import com.gmit.onlinejob.model.Employee;
import com.gmit.onlinejob.services.EmployeeService;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Properties;

/*Mail password: ezybkfwjbbyxppfo*/

@CrossOrigin(origins = "http://localhost:5173")
@RestController
//@Controller
@RequestMapping("/api/employees/")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    /*This is for Spring MVC*/
    @GetMapping("/")
    public String viewHomePage(Model model) {
        return "index.html";
    }

    @GetMapping("/subscription")
    public String subscription(Model model) {
        return "subscription.html";
    }

    @GetMapping("/registerform")
    public String RegisterForm(Model model) {
        Employee employee = new Employee();
        model.addAttribute("employee", employee);
        return "register.html";
    }

    @PostMapping("/save_employee")
    public String saveEmployee(@ModelAttribute("employee") Employee employee) {
        // save Course to database
        employeeService.saveEmployee(employee);
        sendNotification(employee);
        return "index.html";
    }

	/*
    //This is used when call from React
	@PostMapping("/register_employee")
    public Employee saveEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }
    */

    @PostMapping("/employee_login")
    public ResponseEntity<ApiResponse> employeeLogin(@RequestBody Employee employee) {
        Employee emp = employeeService.employeeLogin(employee);

        if (emp != null) {
            return ResponseEntity.ok(new ApiResponse(true, emp));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Invalid credentials"));
        }
    }

    @GetMapping("/get_all_employees")
    public List<Employee> getAllEmployees() {
        return employeeService.fetchAllEmployees();
    }

    @GetMapping("/get_employees_by_name/{name}")
    public List<Employee> getEmployeesName(@PathVariable("name") String name) {
        return employeeService.getEmployeeByName(name);
    }

    @GetMapping("/get_employee/{id}")
    public Employee getEmployeeById(@PathVariable("id") Long id) {
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/update_employee/{id}")
    public Employee updateEmployee(@PathVariable("id") Long id, @RequestBody Employee employee) {
        return employeeService.updateEmployeeById(id, employee);
    }

    @DeleteMapping("/delete_employee/{id}")
    public String deleteEmployee(@PathVariable("id") Long id) {
        return employeeService.deleteDepartmentById(id);
    }

    public boolean sendNotification(Employee employee)
    {
        boolean flag=false;

        try
        {
            //Your Email & Pass here
            String fromMail = "anup@euphoriagenx.in";
            String pass = "ezybkfwjbbyxppfo";
            String toMail = "cpcbelgharia56@gmail.com";

            //Setting up
            Properties pr = new Properties();
            pr.setProperty("mail.smtp.host", "smtp.gmail.com");
            pr.setProperty("mail.smtp.port", "587");
            pr.setProperty("mail.smtp.auth", "true");
            pr.setProperty("mail.smtp.starttls.enable", "true");
            pr.setProperty("mail.smtp.socketFactory.port", "587");
            pr.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

            //Mail Session
            Session session = Session.getInstance(pr, new Authenticator() {

                @Override  //Giving access to our mail that it can send mail
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(fromMail,pass);
                }

            });

            //BUILDING MAIL
            Message message = new MimeMessage(session);

            //SETTING RECIEVER & SENDER
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(toMail));
            message.setFrom(new InternetAddress(fromMail));

            //SETTING MESSAGE
            message.setSubject("Registration Notification");
            message.setText("Thank you "+employee.getEmployeeName()+" for registering in HireMe website.");

            Transport.send(message);
            flag=true;
        }

        catch(Exception e)
        {
            e.printStackTrace();
        }


        return(flag);
    }
}
