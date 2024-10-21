package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Jobs;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class JobsImpl implements JobsInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/linkedIn";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "1234";

    @Override
    public List<Jobs> getAllJobs() {
        List<Jobs> Jobs = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM jobs");) {
            while (rs.next()) {
                Jobs jobs = mapResultSetToJobs(rs);
                Jobs.add(jobs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Jobs;
    }

    @Override
    public int updateSave(String save, String id) {
        String sql = "UPDATE jobs SET save = ? WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, save);
            stmt.setString(2, id);
            return stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public Jobs getJobById(String id) {
        Jobs job = null;
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM jobs WHERE id = ?")) {
            stmt.setString(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    job = mapResultSetToJobs(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return job;
    }

    private Jobs mapResultSetToJobs(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String title = rs.getString("title");
        String companyName = rs.getString("companyName");
        String companyLogo = rs.getString("companyLogo");
        String location = rs.getString("location");
        String level = rs.getString("level");
        String about = rs.getString("about");
        String save = rs.getString("save");

        return new Jobs(id, title, companyName, companyLogo, location, level, about, save);
    }

}