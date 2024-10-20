package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.env.Environment;

import com.example.backend.model.Jobs;
import com.example.backend.model.People;
import com.example.backend.service.JobsService;
import com.example.backend.service.PeopleService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600, allowCredentials = "true")
@RequestMapping("/")
@SpringBootApplication
public class BackendApplication {

	private final PeopleService peopleService;
	private final JobsService jobsService;

	public BackendApplication(PeopleService peopleService, JobsService jobsService) {
		this.peopleService = peopleService;
		this.jobsService = jobsService;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@GetMapping("/people")
	@ResponseBody
	public List<People> fetchPeople() {
		return peopleService.getAllPeople();
	}

	@GetMapping("/jobs")
	@ResponseBody
	public List<Jobs> fetchJobs() {
		return jobsService.getAllJobs();
	}

}
