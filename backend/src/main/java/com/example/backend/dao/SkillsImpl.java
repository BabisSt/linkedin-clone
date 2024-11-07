package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Skills;
import com.example.backend.model.Users;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Component
public class SkillsImpl implements SkillsInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/linkedIn";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "1234";

    @Override
    public List<Skills> getAllSkills() {
        List<Skills> skills = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM skills");) {
            while (rs.next()) {
                Skills skill = mapResultSetToSkills(rs);
                skills.add(skill);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return skills;
    }

    @Override
    public Skills getSkillsByUserId(String userId) {
        Skills skills = null;
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Skills WHERE user_id = ?")) {
            stmt.setString(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    skills = mapResultSetToSkills(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return skills;
    }

    @Override
    public Optional<Skills> selectSkillByUserId(String userId) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM skills WHERE user_id = ?");) {
            stmt.setString(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Skills skills = mapResultSetToSkills(rs);
                    return Optional.of(skills);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    @Override
    public int updateSkillByUserId(String userId, Skills skills) {
        int rowsAffected = 0;

        // Fetch the current user details from the database
        Optional<Skills> currentSkillOpt = selectSkillByUserId(userId);
        if (!currentSkillOpt.isPresent()) {
            return 0;
        }
        Skills currentSkill = currentSkillOpt.get();

        if (skills.getSkillName() != null) {
            currentSkill.setSkillName(skills.getSkillName());
        }

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "UPDATE skills SET skill_name = ? WHERE user_id = ?");) {
            stmt.setString(1, currentSkill.getSkillName());
            stmt.setString(2, userId);

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public int deleteSkillByUserId(String userId) {
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
        int id = 100 + random.nextInt(900);
        return String.valueOf(id);
    }

    @Override
    public int insertSkillByUserId(String userId, Skills skills) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD)) {
            // Check if the userId already exists
            String checkQuery = "SELECT COUNT(*) FROM skills WHERE user_id = ?";
            try (PreparedStatement checkStmt = conn.prepareStatement(checkQuery)) {
                checkStmt.setString(1, userId);
                try (ResultSet rs = checkStmt.executeQuery()) {
                    if (rs.next() && rs.getInt(1) > 0) {
                        // Update existing row if userId is found
                        String updateQuery = "UPDATE skills SET skill_name = ? WHERE user_id = ?";
                        try (PreparedStatement updateStmt = conn.prepareStatement(updateQuery)) {
                            updateStmt.setString(1, skills.getSkillName());
                            updateStmt.setString(2, userId);
                            rowsAffected = updateStmt.executeUpdate();
                        }
                    } else {
                        // Insert new row if userId is not found
                        String insertQuery = "INSERT INTO skills (id, skill_name, user_id) VALUES (?, ?, ?)";
                        try (PreparedStatement insertStmt = conn.prepareStatement(insertQuery)) {
                            insertStmt.setString(1, generateNumericId());
                            insertStmt.setString(2, skills.getSkillName());
                            insertStmt.setString(3, userId);
                            rowsAffected = insertStmt.executeUpdate();
                        }
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    private Skills mapResultSetToSkills(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String skillName = rs.getString("skill_name");
        String userId = rs.getString("user_id");

        return new Skills(id, skillName, userId);
    }

}