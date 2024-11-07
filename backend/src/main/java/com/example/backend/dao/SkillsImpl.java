package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Skills;
import com.example.backend.model.Users;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

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

    private Skills mapResultSetToSkills(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String skillName = rs.getString("skill_name");
        String userId = rs.getString("user_id");

        return new Skills(id, skillName, userId);
    }

}