package com.example.backend.controllers;

import org.springframework.web.bind.annotation.PutMapping;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    // @PostMapping("/update")
    // public ResponseEntity<Map<String, Object>> updateUser(@RequestBody Users
    // user) {

    // int newUserId = usersImpl.updateUserByUserId(user.getId(), user);
    // if (newUserId > 0) {
    // Map<String, Object> response = new HashMap<>();
    // response.put("message", "User registered successfully");
    // response.put("id", newUserId);
    // return ResponseEntity.ok(response);
    // } else {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    // }

    // }

    @RequestMapping(method = RequestMethod.PUT, path = "/updateUserByUserId/{Id}")
    public ResponseEntity<String> updateUser(@PathVariable("Id") String Id, @RequestBody Users user) {
        int result = usersImpl.updateUserByUserId(Id, user);
        if (result > 0) {
            return ResponseEntity.ok("User updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating User.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody Users user) {
        // Check if the user already exists
        if (usersImpl.selectUserByEmail(user.getEmail()).isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Email already registered. Please use a different email.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } else {
            int newUserId = usersImpl.insertUser(user);
            if (newUserId > 0) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "User registered successfully");
                response.put("id", newUserId);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }
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

    @RequestMapping(method = RequestMethod.DELETE, path = "/deleteUserByUserId/{Id}")
    public ResponseEntity<String> deleteUserByUserId(@PathVariable("Id") String Id) {
        int result = usersImpl.deleteUserByUserId(Id);
        if (result > 0) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting User.");
        }
    }

}
