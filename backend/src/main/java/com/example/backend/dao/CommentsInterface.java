package com.example.backend.dao;

import com.example.backend.model.Comments;
import java.util.List;

public interface CommentsInterface {
    List<Comments> getAllComments();

    List<Comments> getCommentsByPostId(String postId);

    int insertCommentByPostId(String postId, Comments comment, String userId);

    int deleteComment(String commentId);
}
