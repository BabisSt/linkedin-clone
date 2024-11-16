package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Posts;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class PostsImpl implements PostsInterface {

    // Database connection details
    private static final String DB_URL = "jdbc:mysql://localhost:3306/linkedIn";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "1234";

    @Override
    public List<Posts> getAllPosts() {
        List<Posts> posts = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM Posts");) {
            while (rs.next()) {
                Posts post = mapResultSetToPosts(rs);
                posts.add(post);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return posts;
    }

    @Override
    public int updateLikesByPostId(String postId, boolean increment) {
        String updateQuery = "UPDATE Posts SET likes = likes + ? WHERE id = ?";
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn.prepareStatement(updateQuery)) {
            stmt.setInt(1, increment ? 1 : -1);
            stmt.setString(2, postId);

            rowsAffected = stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    @Override
    public int deletePostByUserId(String userId, String postId) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
                PreparedStatement stmt = conn
                        .prepareStatement("DELETE FROM posts WHERE user_id = ? AND id = ? ");) {
            stmt.setString(1, userId);
            stmt.setString(2, postId);

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
    public int insertPostByUserId(String userId, Posts post) {
        int rowsAffected = 0;

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD)) {
            // Check if the userId already exists

            // Insert new row if userId is not found
            String insertQuery = "INSERT INTO posts (id,post_time,posted_by,posted_by_avatar,content,likes,number_of_comments,photo,user_id,title) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement insertStmt = conn.prepareStatement(insertQuery)) {
                insertStmt.setString(1, generateNumericId());
                insertStmt.setString(2, post.getPostTime());
                insertStmt.setString(3, post.getPostedBy());
                insertStmt.setString(4, post.getPostedByAvatar());
                insertStmt.setString(5, post.getContent());
                insertStmt.setString(6, post.getLikes());
                insertStmt.setString(7, post.getNumberOfComments());
                insertStmt.setString(8, post.getPhoto());
                insertStmt.setString(9, userId);
                insertStmt.setString(10, post.getTitle());
                rowsAffected = insertStmt.executeUpdate();
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rowsAffected;
    }

    private Posts mapResultSetToPosts(ResultSet rs) throws SQLException {

        String id = rs.getString("id");
        String postTime = rs.getString("post_time");
        String postedBy = rs.getString("posted_by");
        String postedByAvatar = rs.getString("posted_by_avatar");
        String content = rs.getString("content");
        String likes = rs.getString("likes");
        String numberOfComments = rs.getString("number_of_comments");
        String photo = rs.getString("photo");
        String userId = rs.getString("user_id");
        String title = rs.getString("title");

        return new Posts(id, postTime, postedBy, postedByAvatar, content, likes, numberOfComments, photo, userId,
                title);
    }

}