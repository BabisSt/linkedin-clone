package com.example.backend.dao;

import com.example.backend.model.Skills;

import java.util.List;
import java.util.Optional;

public interface SkillsInterface {
    List<Skills> getAllSkills();

    Skills getSkillsByUserId(String userId);

    public Optional<Skills> selectSkillByUserId(String userId);

    int updateSkillByUserId(String userId, Skills skills);

    int deleteSkillByUserId(String userId);

    int insertSkillByUserId(String userId, Skills skills);
}
