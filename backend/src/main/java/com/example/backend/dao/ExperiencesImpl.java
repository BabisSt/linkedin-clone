package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Experiences;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

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
    public List<Experiences> getExperiencesByUserId(String userId) {
        List<Experiences> experiencesList = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Experiences WHERE user_id = ?")) {

            stmt.setString(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Experiences experience = mapResultSetToExperiences(rs);
                    experiencesList.add(experience);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return experiencesList;
    }

    @Override
    public Optional<Experiences> selectExperienceByUserId(String userId) {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM experiences WHERE user_id = ?");) {
            stmt.setString(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Experiences experience = mapResultSetToExperiences(rs);
                    return Optional.of(experience);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    @Override
    public int updateExperienceByUserId(String userId, Experiences experience) {
        int rowsAffected = 0;

        // Fetch the current user details from the database
        Optional<Experiences> currentExperienceOpt = selectExperienceByUserId(userId);
        if (!currentExperienceOpt.isPresent()) {
            return 0;
        }
        Experiences currentExperience = currentExperienceOpt.get();

        if (experience.getTitle() != null) {
            currentExperience.setTitle(experience.getTitle());
        }

        if (experience.getLevel() != null) {
            currentExperience.setLevel(experience.getLevel());
        }

        if (experience.getCompanyName() != null) {
            currentExperience.setCompanyName(experience.getCompanyName());
        }

        if (experience.getCompanyLogo() != null) {
            currentExperience.setCompanyLogo(experience.getCompanyLogo());
        }

        if (experience.getDuration() != null) {
            currentExperience.setDuration(experience.getDuration());
        }

        if (experience.getLocation() != null) {
            currentExperience.setLocation(experience.getLocation());
        }

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(
                        "UPDATE experiences SET title = ?, company_name = ? , company_logo = ? , location = ? , level = ? , duration = ? WHERE user_id = ?");) {
            stmt.setString(1, currentExperience.getTitle());
            stmt.setString(2, currentExperience.getCompanyName());
            stmt.setString(3, currentExperience.getCompanyLogo());
            stmt.setString(4, currentExperience.getLocation());
            stmt.setString(5, currentExperience.getLevel());
            stmt.setString(6, currentExperience.getDuration());
            stmt.setString(7, userId);

            rowsAffected = stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public int deleteExperienceByUserId(String userId, String experienceId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("DELETE FROM experiences WHERE user_id = ? AND id = ? ");) {
            stmt.setString(1, userId);
            stmt.setString(2, experienceId);

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
    public int insertExperienceByUserId(String userId, Experiences experience) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD)) {
            // Check if the userId already exists

            // Insert new row if userId is not found
            String insertQuery = "INSERT INTO experiences (id, title,company_name,company_logo,location,level,duration,user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement insertStmt = conn.prepareStatement(insertQuery)) {
                insertStmt.setString(1, generateNumericId());
                insertStmt.setString(2, experience.getTitle());
                insertStmt.setString(3, experience.getCompanyName());
                insertStmt.setString(4, experience.getCompanyLogo());
                insertStmt.setString(5, experience.getLocation());
                insertStmt.setString(6, experience.getLevel());
                insertStmt.setString(7, experience.getDuration());
                insertStmt.setString(8, userId);
                rowsAffected = insertStmt.executeUpdate();
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
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