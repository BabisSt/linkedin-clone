package com.example.backend.service;

import com.example.backend.dao.UsersInterface;
import com.example.backend.model.Users;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    private UsersInterface usersInterface;

    public UsersService(UsersInterface usersInterface) {
        this.usersInterface = usersInterface;
    }

    public List<Users> getAllUsers() {
        return usersInterface.getAllUsers();
    }

    public Users getUserById(String id) {
        return usersInterface.getUserById(id);
    }

    public Optional<Users> getUser(String userId) {
        return usersInterface.selectUserByUserId(userId);
    }

    public int updateUser(String userId, Users user) {
        return usersInterface.updateUserByUserId(userId, user);
    }

    public Users getUserByUsername(String username) {
        return usersInterface.selectUserByUsername(username);
    }

    public int removeUser(String userId) {
        Optional<Users> optionalUser = getUser(userId);
        if (optionalUser.isPresent()) {
            usersInterface.deleteUserByUserId(userId);
            return 1;
        }
        return -1;
    }

    public int insertUser(Users user) {
        return usersInterface.insertUser(user);
    }
}
