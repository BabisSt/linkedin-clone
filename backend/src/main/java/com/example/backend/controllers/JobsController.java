package com.example.backend.controllers;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Jobs;
import com.example.backend.service.JobsService;

@RestController
public class JobsController {

    private final JobsService jobsService;

    public JobsController(JobsService jobsService) {
        this.jobsService = jobsService;
    }

    // PUT method for updating a job
    @PutMapping("/jobs/{id}")
    public ResponseEntity<String> updateJob(@PathVariable String id, @RequestBody Jobs updatedJob) {
        int result = jobsService.updateSave(updatedJob.getSave(), id);
        if (result == 1) {
            return ResponseEntity.ok("Job updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
        }
    }
}
