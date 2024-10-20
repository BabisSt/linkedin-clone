package com.example.backend.service;

import com.example.backend.dao.JobsInterface;
import com.example.backend.dao.PeopleInterface;
import com.example.backend.model.Jobs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobsService {

    private JobsInterface jobsInterface;

    public JobsService(JobsInterface jobsInterface) {
        this.jobsInterface = jobsInterface;
    }

    public List<Jobs> getAllJobs() {
        return jobsInterface.getAllJobs();
    }
}
