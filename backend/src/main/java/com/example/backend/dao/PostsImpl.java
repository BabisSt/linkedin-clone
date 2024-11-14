package com.example.backend.dao;

import org.springframework.stereotype.Component;
import com.example.backend.model.Posts;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

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

        return new Posts(id, postTime, postedBy, postedByAvatar, content, likes, numberOfComments, photo, userId);
    }

}