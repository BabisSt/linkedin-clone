package com.example.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dao.PostsImpl;
import com.example.backend.model.Posts;
import com.example.backend.service.PostsService;

@RestController
public class PostsController {

    private final PostsService postsService;
    private final PostsImpl postsImpl;

    public PostsController(PostsService postsService, PostsImpl postsImpl) {
        this.postsService = postsService;
        this.postsImpl = postsImpl;
    }

    @PostMapping("/updateLikesByPostId/{Id}")
    public ResponseEntity<String> updateLikes(@PathVariable("Id") String Id, @RequestBody boolean increment) {
        int result = postsImpl.updateLikesByPostId(Id, increment);
        if (result > 0) {
            return ResponseEntity.ok("Likes updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating Likes.");
        }
    }

    @RequestMapping(method = RequestMethod.POST, path = "/insertPostByUserId/{Id}")
    public ResponseEntity<String> insertPost(@PathVariable("Id") String Id,
            @RequestBody Posts post) {
        int result = postsImpl.insertPostByUserId(Id, post);
        if (result > 0) {
            return ResponseEntity.ok("Post inserted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting Post.");
        }
    }

    @DeleteMapping("/deletePostByUserId/{userId}/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable("userId") String userId,
            @PathVariable("postId") String postId) {
        int result = postsImpl.deletePostByUserId(userId, postId);
        if (result > 0) {
            return ResponseEntity.ok("Post deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting Post.");
        }
    }
}
