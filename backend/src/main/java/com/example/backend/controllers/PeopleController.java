package com.example.backend.controllers;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.People;
import com.example.backend.service.PeopleService;

@RestController
public class PeopleController {

    private final PeopleService peopleService;

    public PeopleController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }

    // // PUT method for updating a job
    // @PutMapping("/People/{id}")
    // public ResponseEntity<String> updateJob(@PathVariable String id, @RequestBody
    // People updatedJob) {
    // int result = PeopleService.updateSave(updatedJob.getSave(), id);
    // if (result == 1) {
    // return ResponseEntity.ok("Job updated successfully");
    // } else {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
    // }
    // }
}
