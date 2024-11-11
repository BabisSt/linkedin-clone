package com.example.backend.dao;

import com.example.backend.model.Experiences;

import java.util.List;
import java.util.Optional;

public interface ExperiencesInterface {
    List<Experiences> getAllExperiences();

    List<Experiences> getExperiencesByUserId(String userId);

    public Optional<Experiences> selectExperienceByUserId(String userId);

    int updateExperienceByUserId(String userId, Experiences experience);

    int deleteExperienceByUserId(String userId, String experienceId);

    int insertExperienceByUserId(String userId, Experiences experience);
}
