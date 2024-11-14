package com.example.backend.service;

import com.example.backend.dao.CommentsInterface;
import com.example.backend.model.Comments;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsService {

    private CommentsInterface commentsInterface;

    public CommentsService(CommentsInterface commentsInterface) {
        this.commentsInterface = commentsInterface;
    }

    public List<Comments> getAllComments() {
        return commentsInterface.getAllComments();
    }

    public List<Comments> getCommentsByPostId(String postId) {
        return commentsInterface.getCommentsByPostId(postId);
    }
}
