package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Comments;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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

    public static String generateNumericId() {
        Random random = new Random();
        int id = 100 + random.nextInt(900);
        return String.valueOf(id);
    }

    @Override
    public int deleteComment(String commentId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("DELETE FROM comments WHERE id = ? ");) {
            stmt.setString(1, commentId);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public int insertCommentByPostId(String postId, Comments comment, String userId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD)) {
            String insertQuery = "INSERT INTO comments (id, avatar, name, date_posted, content, post_id,user_id) VALUES (?, ?, ?, ?, ?, ?,?)";
            try (PreparedStatement insertStmt = conn.prepareStatement(insertQuery)) {
                insertStmt.setString(1, generateNumericId());
                insertStmt.setString(2, comment.getAvatar());
                insertStmt.setString(3, comment.getName());
                insertStmt.setString(4, comment.getDatePosted());
                insertStmt.setString(5, comment.getContent());
                insertStmt.setString(6, postId);
                insertStmt.setString(7, userId);

                rowsAffected = insertStmt.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println("SQL Error: " + e.getMessage());
            e.printStackTrace();
        }

        return rowsAffected;
    }

    private Comments mapResultSetToComments(ResultSet rs) throws SQLException {
        String id = rs.getString("id");
        String avatar = rs.getString("avatar");
        String name = rs.getString("name");
        String datePosted = rs.getString("date_posted");
        String content = rs.getString("content");
        String postId = rs.getString("post_id");
        String userId = rs.getString("user_id");

        return new Comments(id, avatar, name, datePosted, content, postId, userId);
    }

}