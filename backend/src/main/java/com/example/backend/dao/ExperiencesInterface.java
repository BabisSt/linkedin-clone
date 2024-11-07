package com.example.backend.dao;

import com.example.backend.model.Experiences;
import java.util.List;

public interface ExperiencesInterface {
    List<Experiences> getAllExperiences();

    Experiences getExperiencesByUserId(String userId);
}
