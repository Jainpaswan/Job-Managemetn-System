package com.gmit.onlinejob.controller;

import com.gmit.onlinejob.model.User;
import com.gmit.onlinejob.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing user-related operations such as registration,
 * profile update, retrieval, and deletion.
 *
 * Base path: /users
 */
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Register a new user.
     *
     * @param user The user details to register.
     * @return The registered user (without password).
     */
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        savedUser.setPassword(null); // hide password before sending response
        return ResponseEntity.ok(savedUser);
    }

    /**
     * (Optional) Login endpoint —
     * For JWT-based authentication, move login logic to an AuthController.
     * Uncomment if using traditional login.
     */
//    @PostMapping("/login")
//    public ResponseEntity<User> loginUser(@RequestBody User user) {
//        User loggedInUser = userService.login(user.getEmail(), user.getPassword());
//        if (loggedInUser == null) {
//            return ResponseEntity.status(401).build(); // Unauthorized
//        }
//        loggedInUser.setPassword(null);
//        return ResponseEntity.ok(loggedInUser);
//    }

    /**
     * Update existing user details.
     *
     * @param id   The user ID.
     * @param user Updated user data.
     * @return The updated user.
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updated = userService.updateUser(id, user);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        updated.setPassword(null);
        return ResponseEntity.ok(updated);
    }

    /**
     * Retrieve all registered users.
     *
     * @return List of all users.
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * Get user by ID.
     *
     * @param id The user ID.
     * @return The user if found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    /**
     * Delete a user by ID.
     *
     * @param id The user ID.
     * @return 204 No Content if successful.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
