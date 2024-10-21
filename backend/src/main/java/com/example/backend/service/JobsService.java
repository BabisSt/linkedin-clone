package com.example.backend.service;

import com.example.backend.dao.JobsInterface;
import com.example.backend.model.Jobs;
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

    public int updateSave(String save, String id) {
        return jobsInterface.updateSave(save, id);
    }

    public Jobs getJobById(String id) {
        return jobsInterface.getJobById(id);
    }

}
