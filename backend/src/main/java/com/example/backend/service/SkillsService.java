package com.example.backend.service;

import com.example.backend.dao.SkillsInterface;
import com.example.backend.model.Skills;
import com.example.backend.model.Users;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillsService {

    private SkillsInterface skillsInterface;

    public SkillsService(SkillsInterface skillsInterface) {
        this.skillsInterface = skillsInterface;
    }

    public List<Skills> getAllSkills() {
        return skillsInterface.getAllSkills();
    }

    public Skills getSkillsByUserId(String userId) {
        return skillsInterface.getSkillsByUserId(userId);
    }
}
