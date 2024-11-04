package com.example.backend.dao;

import com.example.backend.model.Skills;
import java.util.List;

public interface SkillsInterface {
    List<Skills> getAllSkills();

    Skills getSkillsById(String id);

}
