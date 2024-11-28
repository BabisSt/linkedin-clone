package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.model.Comments;
import com.example.backend.model.Experiences;
import com.example.backend.model.Jobs;
import com.example.backend.model.People;
import com.example.backend.model.Posts;
import com.example.backend.model.Skills;
import com.example.backend.model.Users;
import com.example.backend.service.CommentsService;
import com.example.backend.service.ExperiencesService;
import com.example.backend.service.JobsService;
import com.example.backend.service.PeopleService;
import com.example.backend.service.PostsService;
import com.example.backend.service.SkillsService;
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
	private final CommentsService commentsService;
	private final ExperiencesService experiencesService;
	private final SkillsService skillsService;

	public BackendApplication(PeopleService peopleService, JobsService jobsService, UsersService usersService,
			PostsService postsService, CommentsService commentsService, ExperiencesService experiencesService,
			SkillsService skillsService) {
		this.peopleService = peopleService;
		this.jobsService = jobsService;
		this.usersService = usersService;
		this.postsService = postsService;
		this.commentsService = commentsService;
		this.experiencesService = experiencesService;
		this.skillsService = skillsService;
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

	@GetMapping("/users/{id}")
	@ResponseBody
	public Users fetchUserById(@PathVariable String id) {
		return usersService.getUserById(id);
	}

	@GetMapping("/users/username/{username}")
	@ResponseBody
	public String fetchUserIdByUsername(@PathVariable String username) {
		Users user = usersService.getUserByUsername(username);
		if (user != null) {
			return user.getId();
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

		}
	}

	@GetMapping("/posts")
	@ResponseBody
	public List<Posts> fetchPosts() {
		return postsService.getAllPosts();
	}

	@GetMapping("/comments")
	@ResponseBody
	public List<Comments> fetchComments() {
		return commentsService.getAllComments();
	}

	@GetMapping("/experiences")
	@ResponseBody
	public List<Experiences> fetchExperiences() {
		return experiencesService.getAllExperiences();
	}

	@GetMapping("/experiences/{userId}")
	@ResponseBody
	public List<Experiences> fetchExperiencesByUserId(@PathVariable String userId) {
		return experiencesService.getExperiencesByUserId(userId);
	}

	@GetMapping("/skills")
	@ResponseBody
	public List<Skills> fetchSkills() {
		return skillsService.getAllSkills();
	}

	@GetMapping("/skills/{userId}")
	@ResponseBody
	public Skills fetchSkillsByUserId(@PathVariable String userId) {
		return skillsService.getSkillsByUserId(userId);
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
