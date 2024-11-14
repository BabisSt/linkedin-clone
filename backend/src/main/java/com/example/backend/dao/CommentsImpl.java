package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Comments;
import com.example.backend.model.Experiences;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class CommentsImpl implements CommentsInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/linkedIn";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "1234";

    @Override
    public List<Comments> getAllComments() {
        List<Comments> comments = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM comments");) {
            while (rs.next()) {
                Comments comment = mapResultSetToComments(rs);
                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return comments;
    }

    @Override
    public List<Comments> getCommentsByPostId(String postId) {
        List<Comments> commentsList = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement("SELECT * FROM comments WHERE post_id = ?")) {

            stmt.setString(1, postId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Comments comment = mapResultSetToComments(rs);
                    commentsList.add(comment);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return commentsList;
    }

    private Comments mapResultSetToComments(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String avatar = rs.getString("avatar");
        String name = rs.getString("name");
        String datePosted = rs.getString("date_posted");
        String content = rs.getString("content");
        String postId = rs.getString("post_id");

        return new Comments(id, avatar, name, datePosted, content, postId);
    }

}