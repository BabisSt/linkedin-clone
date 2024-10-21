package com.example.backend.dao;

import com.example.backend.model.Posts;
import java.util.List;

public interface PostsInterface {
    List<Posts> getAllPosts();

    // int updateSave(String save, String index);

    // Posts getPostById(String id);
}
