package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Users;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

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
    public Optional<Users> selectUserByUserId(String userId) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");) {
            stmt.setString(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Users user = mapResultSetToUsers(rs);
                    return Optional.of(user);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    @Override
    public Users selectUserByUsername(String username) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE name = ?");) {
            stmt.setString(1, username);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Users user = mapResultSetToUsers(rs);
                    return user;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Optional<Users> selectUserByEmail(String userEmail) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE email = ?");) {
            stmt.setString(1, userEmail);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Users user = mapResultSetToUsers(rs);
                    return Optional.of(user);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    @Override
    public int updateUserByUserId(String userId, Users user) {
        int rowsAffected = 0;

        // Fetch the current user details from the database
        Optional<Users> currentUserOpt = selectUserByUserId(userId);
        if (!currentUserOpt.isPresent()) {
            return 0; // User not found
        }
        Users currentUser = currentUserOpt.get();
        if (user.getName() != null) {
            currentUser.setName(user.getName());
        }
        if (user.getEmail() != null) {
            currentUser.setEmail(user.getEmail());
        }
        if (user.getAvatar() != null) {
            currentUser.setAvatar(user.getAvatar());
        }
        if (user.getBg() != null) {
            currentUser.setBg(user.getBg());
        }
        if (user.getAboutContent() != null) {
            currentUser.setAboutContent(user.getAboutContent());
        }
        if (user.getUsername() != null) {
            currentUser.setUsername(user.getUsername());
        }
        if (user.getPassword() != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            currentUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "UPDATE users SET name = ?, email = ? , avatar = ?, bg= ? , about_content = ? , username = ? , password= ? WHERE id = ?");) {
            stmt.setString(1, currentUser.getName());
            stmt.setString(2, currentUser.getEmail());
            stmt.setString(3, currentUser.getAvatar());
            stmt.setString(4, currentUser.getBg());
            stmt.setString(5, currentUser.getAboutContent());
            stmt.setString(6, currentUser.getUsername());
            stmt.setString(7, currentUser.getPassword());
            stmt.setString(8, userId);

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public int deleteUserByUserId(String userId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("DELETE FROM users WHERE id = ?");) {
            stmt.setString(1, userId);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    public static String generateNumericId() {
        Random random = new Random();
        int id = 100 + random.nextInt(900); // Generates a 6-digit number
        return String.valueOf(id);
    }

    @Override
    public int insertUser(Users user) {
        int rowsAffected = 0;
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "INSERT INTO users (id, name, email, avatar, bg, about_content, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");) {

            // Hash the password before saving
            String hashedPassword = passwordEncoder.encode(user.getPassword());

            stmt.setString(1, generateNumericId());
            stmt.setString(2, user.getName());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getAvatar());
            stmt.setString(5, user.getBg());
            stmt.setString(6, user.getAboutContent());
            stmt.setString(7, user.getUsername());
            stmt.setString(8, hashedPassword);

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public Users authenticateUser(String email, String password) {
        Users user = null;
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE email = ?");) {
            stmt.setString(1, email);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    user = mapResultSetToUsers(rs);

                    // Verify the password
                    if (!passwordEncoder.matches(password, user.getPassword())) {
                        return null; // Password does not match
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user; // Return null if invalid credentials
    }

    private Users mapResultSetToUsers(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String name = rs.getString("name");
        String email = rs.getString("email");
        String avatar = rs.getString("avatar");
        String bg = rs.getString("bg");
        String about_content = rs.getString("about_content");
        String username = rs.getString("username");
        String password = rs.getString("password");

        return new Users(id, name, email, avatar, bg, about_content, username, password);
    }

}