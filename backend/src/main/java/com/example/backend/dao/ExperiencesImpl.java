package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Experiences;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class ExperiencesImpl implements ExperiencesInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/linkedIn";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "1234";

    @Override
    public List<Experiences> getAllExperiences() {
        List<Experiences> experiences = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM experiences");) {
            while (rs.next()) {
                Experiences experience = mapResultSetToExperiences(rs);
                experiences.add(experience);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return experiences;
    }

    @Override
    public Experiences getExperiencesByUserId(String userId) {
        Experiences experiences = null;
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Experiences WHERE user_id = ?")) {
            stmt.setString(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    experiences = mapResultSetToExperiences(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return experiences;
    }

    private Experiences mapResultSetToExperiences(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String title = rs.getString("title");
        String level = rs.getString("level");
        String companyName = rs.getString("company_name");
        String companyLogo = rs.getString("company_logo");
        String duration = rs.getString("duration");
        String location = rs.getString("location");
        String userId = rs.getString("user_id");

        return new Experiences(id, title, level, companyName, companyLogo, duration, location, userId);
    }

}