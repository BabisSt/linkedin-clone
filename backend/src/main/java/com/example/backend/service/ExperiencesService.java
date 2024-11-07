package com.example.backend.service;

import com.example.backend.dao.ExperiencesInterface;
import com.example.backend.model.Experiences;
import com.example.backend.model.Skills;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperiencesService {

    private ExperiencesInterface experiencesInterface;

    public ExperiencesService(ExperiencesInterface experiencesInterface) {
        this.experiencesInterface = experiencesInterface;
    }

    public List<Experiences> getAllExperiences() {
        return experiencesInterface.getAllExperiences();
    }

    public Experiences getExperiencesByUserId(String userId) {
        return experiencesInterface.getExperiencesByUserId(userId);
    }
}
