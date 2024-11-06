package com.example.backend.dao;

import com.example.backend.model.Users;
import java.util.List;
import java.util.Optional;

public interface UsersInterface {
    List<Users> getAllUsers();

    Users getUserById(String id);

    public Users authenticateUser(String email, String password);

    public Optional<Users> selectUserByUserId(Integer userId);

    public Optional<Users> selectUserByEmail(String userEmail);

    int updateUser(Integer userId, Users user);

    int deleteUserByUserId(Integer userId);

    int insertUser(Users user);
}
