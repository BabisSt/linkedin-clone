package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.People;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class PeopleImpl implements PeopleInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/linkedIn";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "1234";

    @Override
    public List<People> getAllPeople() {
        List<People> peoples = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM people");) {
            while (rs.next()) {
                People people = mapResultSetToPeople(rs);
                peoples.add(people);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return peoples;
    }

    private People mapResultSetToPeople(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String avatar = rs.getString("avatar");
        String name = rs.getString("name");
        String role = rs.getString("role");
        String company = rs.getString("company");

        return new People(id, avatar, name, role, company);
    }

}