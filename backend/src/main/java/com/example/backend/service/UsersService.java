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

    public Optional<Users> getUser(Integer userId) {
        return usersInterface.selectUserByUserId(userId);
    }

    public int updateUser(Integer userId, Users user) {
        return usersInterface.updateUser(userId, user);
    }

    public int removeUser(Integer userId) {
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
