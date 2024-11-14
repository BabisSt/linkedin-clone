package com.example.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dao.PostsImpl;
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
}
