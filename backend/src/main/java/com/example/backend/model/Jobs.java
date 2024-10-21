package com.example.backend.model;

public class Jobs {
    private String id;
    private String title;
    private String companyName;
    private String companyLogo;
    private String location;
    private String level;
    private String about;
    private String save;

    public Jobs(String id, String title, String companyName, String companyLogo, String location, String level,
            String about, String save) {
        this.id = id;
        this.title = title;
        this.companyName = companyName;
        this.companyLogo = companyLogo;
        this.location = location;
        this.level = level;
        this.about = about;
        this.save = save;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getCompanyLogo() {
        return companyLogo;
    }

    public String getLocation() {
        return location;
    }

    public String getLevel() {
        return level;
    }

    public String getAbout() {
        return about;
    }

    public String getSave() {
        return save;
    }

}