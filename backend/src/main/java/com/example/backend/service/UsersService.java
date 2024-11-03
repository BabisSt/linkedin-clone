package com.example.backend.service;

import com.example.backend.dao.UsersInterface;
import com.example.backend.model.Users;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
