package com.example.backend.controllers;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dao.SkillsImpl;
import com.example.backend.dao.UsersImpl;
import com.example.backend.model.Skills;
import com.example.backend.model.Users;
import com.example.backend.service.SkillsService;

@RestController
public class SkillsController {

    private final SkillsService skillsService;
    private final SkillsImpl skillsImpl;

    public SkillsController(SkillsService skillsService, SkillsImpl skillsImpl) {
        this.skillsService = skillsService;
        this.skillsImpl = skillsImpl;
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/updateSkillByUserId/{Id}")
    public ResponseEntity<String> updateSKill(@PathVariable("Id") String Id, @RequestBody Skills skills) {
        int result = skillsImpl.updateSkillByUserId(Id, skills);
        if (result > 0) {
            return ResponseEntity.ok("Skill updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating Skill.");
        }
    }

    @RequestMapping(method = RequestMethod.POST, path = "/insertSkillByUserId/{Id}")
    public ResponseEntity<String> insertSKill(@PathVariable("Id") String Id, @RequestBody Skills skills) {
        int result = skillsImpl.insertSkillByUserId(Id, skills);
        if (result > 0) {
            return ResponseEntity.ok("Skill inserted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting Skill.");
        }
    }
}
