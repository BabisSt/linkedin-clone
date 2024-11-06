package com.example.backend.model;

public class Users {
    private String id;
    private String name;
    private String email;
    private String avatar;
    private String bg;
    private String aboutContent;
    private String username;
    private String password;

    public Users(String id, String name, String email, String avatar, String bg, String aboutContent, String username,
            String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.bg = bg;
        this.aboutContent = aboutContent;
        this.username = username;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getBg() {
        return bg;
    }

    public String getAboutContent() {
        return aboutContent;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setBg(String bg) {
        this.bg = bg;
    }

    public void setAboutContent(String aboutContent) {
        this.aboutContent = aboutContent;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}