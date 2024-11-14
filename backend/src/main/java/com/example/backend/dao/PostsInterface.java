package com.example.backend.dao;

import com.example.backend.model.Posts;
import java.util.List;

public interface PostsInterface {
    List<Posts> getAllPosts();

    int updateLikesByPostId(String postId, boolean increment);

}
