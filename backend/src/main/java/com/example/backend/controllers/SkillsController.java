package com.example.backend.controllers;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Skills;
import com.example.backend.service.SkillsService;

@RestController
public class SkillsController {

    private final SkillsService skillsService;

    public SkillsController(SkillsService skillsService) {
        this.skillsService = skillsService;
    }

    // // PUT method for updating a job
    // @PutMapping("/Posts/{id}")
    // public ResponseEntity<String> updateJob(@PathVariable String id, @RequestBody
    // Posts updatedJob) {
    // int result = PostsService.updateSave(updatedJob.getSave(), id);
    // if (result == 1) {
    // return ResponseEntity.ok("Job updated successfully");
    // } else {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
    // }
    // }
}
