package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Users;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

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

    private Users mapResultSetToUsers(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String name = rs.getString("name");
        String email = rs.getString("email");
        String avatar = rs.getString("bg");
        String bg = rs.getString("avatar");
        String aboutContent = rs.getString("about_content");
        String username = rs.getString("username");
        String password = rs.getString("password");

        return new Users(id, name, email, avatar, bg, aboutContent, username, password);
    }

}