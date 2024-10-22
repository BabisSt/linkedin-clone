package com.example.backend.service;

import com.example.backend.dao.SkillsInterface;
import com.example.backend.model.Skills;
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
}
