package com.example.backend.model;

import java.sql.Date;

public class People {
    private String id;
    private String avatar;
    private String name;
    private String role;
    private String company;

    public People(String id, String avatar, String name, String role, String company) {
        this.id = id;
        this.avatar = avatar;
        this.name = name;
        this.role = role;
        this.company = company;
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

    public String getRole() {
        return role;
    }

    public String getCompany() {
        return company;
    }

}