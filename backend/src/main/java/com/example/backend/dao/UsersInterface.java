package com.example.backend.dao;

import com.example.backend.model.Jobs;
import com.example.backend.model.Users;
import java.util.List;
import java.util.Map;

public interface UsersInterface {
    List<Users> getAllUsers();

    Users getUserById(String id);

    public Users authenticateUser(String email, String password);
}
