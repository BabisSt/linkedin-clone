package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Jobs;
import com.example.backend.model.People;
import com.example.backend.model.Posts;
import com.example.backend.model.Users;
import com.example.backend.service.JobsService;
import com.example.backend.service.PeopleService;
import com.example.backend.service.PostsService;
import com.example.backend.service.UsersService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600, allowCredentials = "true")
@RequestMapping("/")
@SpringBootApplication
public class BackendApplication {

	private final PeopleService peopleService;
	private final JobsService jobsService;
	private final UsersService usersService;
	private final PostsService postsService;

	public BackendApplication(PeopleService peopleService, JobsService jobsService, UsersService usersService,
			PostsService postsService) {
		this.peopleService = peopleService;
		this.jobsService = jobsService;
		this.usersService = usersService;
		this.postsService = postsService;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@GetMapping("/people")
	@ResponseBody
	public List<People> fetchPeople() {
		return peopleService.getAllPeople();
	}

	@GetMapping("/users")
	@ResponseBody
	public List<Users> fetchUsers() {
		return usersService.getAllUsers();
	}

	@GetMapping("/posts")
	@ResponseBody
	public List<Posts> fetchPosts() {
		return postsService.getAllPosts();
	}

	@GetMapping("/jobs")
	@ResponseBody
	public List<Jobs> fetchJobs() {
		return jobsService.getAllJobs();
	}

	@GetMapping("/jobs/{id}")
	@ResponseBody
	public Jobs fetchJobById(@PathVariable String id) {
		return jobsService.getJobById(id);
	}

}
