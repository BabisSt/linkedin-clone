package com.example.backend.controllers;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dao.ExperiencesImpl;
import com.example.backend.model.Experiences;
import com.example.backend.service.ExperiencesService;

@RestController
public class ExperiencesController {

    private final ExperiencesService experiencesService;
    private final ExperiencesImpl experiencesImpl;

    public ExperiencesController(ExperiencesService experiencesService, ExperiencesImpl experiencesImpl) {
        this.experiencesService = experiencesService;
        this.experiencesImpl = experiencesImpl;
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/updateExperienceByUserId/{Id}")
    public ResponseEntity<String> updateExperience(@PathVariable("Id") String Id, @RequestBody Experiences experience) {
        int result = experiencesImpl.updateExperienceByUserId(Id, experience);
        if (result > 0) {
            return ResponseEntity.ok("Experience updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating Experience.");
        }
    }

    @RequestMapping(method = RequestMethod.POST, path = "/insertExperienceByUserId/{Id}")
    public ResponseEntity<String> insertExperiences(@PathVariable("Id") String Id,
            @RequestBody Experiences experience) {
        int result = experiencesImpl.insertExperienceByUserId(Id, experience);
        if (result > 0) {
            return ResponseEntity.ok("Experience inserted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting Experience.");
        }
    }

    @DeleteMapping("/deleteExperienceByUserId/{userId}/{experienceId}")
    public ResponseEntity<String> deleteExperiences(@PathVariable("userId") String userId,
            @PathVariable("experienceId") String experienceId) {
        int result = experiencesImpl.deleteExperienceByUserId(userId, experienceId);
        if (result > 0) {
            return ResponseEntity.ok("Experience deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting Experience.");
        }
    }

}
