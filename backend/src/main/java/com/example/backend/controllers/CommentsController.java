package com.example.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dao.CommentsImpl;
import com.example.backend.model.Comments;
import com.example.backend.service.CommentsService;

@RestController
public class CommentsController {

    private final CommentsService commentsService;
    private final CommentsImpl commentsImpl;

    public CommentsController(CommentsService commentsService, CommentsImpl commentsImpl) {
        this.commentsService = commentsService;
        this.commentsImpl = commentsImpl;
    }

    @GetMapping("getCommentsByPostId/{postId}")
    public ResponseEntity<List<Comments>> getCommentsByPostId(@PathVariable("postId") String postId) {
        List<Comments> comments = commentsService.getCommentsByPostId(postId);
        if (comments != null) {
            return ResponseEntity.ok(comments);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
