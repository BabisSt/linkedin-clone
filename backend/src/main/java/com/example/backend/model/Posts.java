package com.example.backend.model;

public class Posts {
    private String id;
    private String postTime;
    private String postedBy;
    private String postedByAvatar;
    private String content;
    private String likes;
    private String numberOfComments;
    private String photo;
    private String userId;

    public Posts(String id, String postTime,
            String postedBy,
            String postedByAvatar,
            String content,
            String likes,
            String numberOfComments,
            String photo,
            String userId) {
        this.id = id;
        this.postTime = postTime;
        this.postedBy = postedBy;
        this.postedByAvatar = postedByAvatar;
        this.content = content;
        this.likes = likes;
        this.numberOfComments = numberOfComments;
        this.photo = photo;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public String getPostTime() {
        return postTime;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public String getPostedByAvatar() {
        return postedByAvatar;
    }

    public String getContent() {
        return content;
    }

    public String getLikes() {
        return likes;
    }

    public String getNumberOfComments() {
        return numberOfComments;
    }

    public String getPhoto() {
        return photo;
    }

    public String getUserId() {
        return userId;
    }

}