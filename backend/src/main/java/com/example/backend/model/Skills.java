package com.example.backend.model;

public class Skills {
    private String id;
    private String skillName;
    private String userId;

    public Skills(String id,
            String skillName,
            String userId) {
        this.id = id;
        this.skillName = skillName;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public String getSkillName() {
        return skillName;
    }

    public String getUserId() {
        return userId;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
}