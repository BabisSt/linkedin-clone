package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Users;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class UsersImpl implements UsersInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/linkedIn";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "1234";

    @Override
    public List<Users> getAllUsers() {
        List<Users> users = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM Users");) {
            while (rs.next()) {
                Users user = mapResultSetToUsers(rs);
                users.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }

    @Override
    public Users getUserById(String id) {
        Users user = null;
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Users WHERE id = ?")) {
            stmt.setString(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    user = mapResultSetToUsers(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    @Override
    public Users authenticateUser(String email, String password) {
        Users user = null;
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("SELECT * FROM users WHERE email = ? AND password = ?");) {
            stmt.setString(1, email);
            stmt.setString(2, password);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    user = mapResultSetToUsers(rs);
                }
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null; // Invalid credentials or user not found
    }

    private Users mapResultSetToUsers(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String name = rs.getString("name");
        String email = rs.getString("email");
        String avatar = rs.getString("avatar");
        String bg = rs.getString("bg");
        String aboutContent = rs.getString("about_content");
        String username = rs.getString("username");
        String password = rs.getString("password");

        return new Users(id, name, email, avatar, bg, aboutContent, username, password);
    }

}