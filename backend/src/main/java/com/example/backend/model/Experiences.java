package com.example.backend.model;

public class Experiences {
    private String id;
    private String title;
    private String level;
    private String companyName;
    private String companyLogo;
    private String duration;
    private String location;
    private String userId;

    public Experiences(String id,
            String title,
            String level,
            String companyName,
            String companyLogo,
            String duration,
            String location,
            String userId) {
        this.id = id;
        this.title = title;
        this.level = level;
        this.companyName = companyName;
        this.companyLogo = companyLogo;
        this.duration = duration;
        this.location = location;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getLevel() {
        return level;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getCompanyLogo() {
        return companyLogo;
    }

    public String getDuration() {
        return duration;
    }

    public String getLocation() {
        return location;
    }

    public String getUserId() {
        return userId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setCompanyLogo(String companyLogo) {
        this.companyLogo = companyLogo;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

}