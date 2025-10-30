package com.gmit.onlinejob.services;

import com.gmit.onlinejob.model.User;
import java.util.List;

public interface UserService {

    User registerUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    User getUserById(Long id);
    List<User> getAllUsers();
    User login(String email, String password);
}
