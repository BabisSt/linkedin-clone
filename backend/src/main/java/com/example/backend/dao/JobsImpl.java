package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Jobs;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    private Jobs mapResultSetToJobs(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String title = rs.getString("title");
        String companyName = rs.getString("companyName");
        String companyLogo = rs.getString("companyLogo");
        String location = rs.getString("location");
        String level = rs.getString("level");
        String about = rs.getString("about");

        return new Jobs(id, title, companyName, companyLogo, location, level, about);
    }

}