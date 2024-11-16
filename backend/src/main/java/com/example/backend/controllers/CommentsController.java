package com.example.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dao.CommentsImpl;
import com.example.backend.model.Comments;
import com.example.backend.model.Experiences;
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

    @RequestMapping(method = RequestMethod.POST, path = "/insertCommentByPostId/{postId}/{userId}")
    public ResponseEntity<String> insertComment(@PathVariable("postId") String postId,
            @RequestBody Comments comment, @PathVariable("userId") String userId) {
        int result = commentsImpl.insertCommentByPostId(postId, comment, userId);
        if (result > 0) {
            return ResponseEntity.ok("Comment inserted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting Comment." + result);
        }
    }

    @DeleteMapping("/deleteComment/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") String commentId) {
        int result = commentsImpl.deleteComment(commentId);
        if (result > 0) {
            return ResponseEntity.ok("Comment deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting Comment.");
        }
    }

}
