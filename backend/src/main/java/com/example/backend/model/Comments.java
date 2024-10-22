package com.example.backend.model;

public class Comments {
    private String id;
    private String avatar;
    private String name;
    private String datePosted;
    private String content;
    private String postId;

    public Comments(String id, String avatar, String name, String datePosted, String content, String postId) {
        this.id = id;
        this.avatar = avatar;
        this.name = name;
        this.datePosted = datePosted;
        this.content = content;
        this.postId = postId;
    }

    public String getId() {
        return id;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getName() {
        return name;
    }

    public String getDatePosted() {
        return datePosted;
    }

    public String getContent() {
        return content;
    }

    public String getPostId() {
        return postId;
    }

}