package com.example.backend.controllers;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dao.UsersImpl;
import com.example.backend.model.Users;
import com.example.backend.service.UsersService;

@RestController
public class UsersController {

    private final UsersService usersService;
    private final UsersImpl usersImpl;

    public UsersController(UsersService usersService, UsersImpl usersImpl) {
        this.usersService = usersService;
        this.usersImpl = usersImpl;
    }

    @PostMapping("/login")
    public ResponseEntity<Users> loginUser(@RequestBody Users user) {
        // Check if the user exists and the credentials are correct
        Users userDetails = usersImpl.authenticateUser(user.getEmail(), user.getPassword());
        if (userDetails != null) {
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
