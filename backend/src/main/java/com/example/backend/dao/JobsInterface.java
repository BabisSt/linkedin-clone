package com.example.backend.dao;

import com.example.backend.model.Jobs;
import java.util.List;

public interface JobsInterface {
    List<Jobs> getAllJobs();

    int updateSave(String save, String index);

    Jobs getJobById(String id);
}
