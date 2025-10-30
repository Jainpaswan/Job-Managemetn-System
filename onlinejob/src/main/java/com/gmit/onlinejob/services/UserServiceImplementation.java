package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.User;
import com.gmit.onlinejob.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 🔹 Register new user (with password hashing)
    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(User.Role.USER);
        }
        return userRepository.save(user);
    }

    // 🔹 Update user details
    @Override
    public User updateUser(Long id, User user) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        existing.setSkills(user.getSkills());
        existing.setResume(user.getResume());

        // Only update password if new one is provided
        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        existing.setRole(user.getRole());
        return userRepository.save(existing);
    }

    // 🔹 Delete user
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // 🔹 Get user by ID
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 🔹 Get all users
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 Login (validate password)
    @Override
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }
}
