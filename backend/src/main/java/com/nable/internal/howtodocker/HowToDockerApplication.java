package com.nable.internal.howtodocker;

import com.nable.internal.howtodocker.repository.TodoRepository;
import com.nable.internal.howtodocker.repository.entity.Todo;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HowToDockerApplication {

	private final TodoRepository todoRepository;

	public HowToDockerApplication(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	@PostConstruct
	void createData() {
		todoRepository.save(Todo.builder().title("Learn Java").description("Read a couple of books about java").completed(false).build());
		todoRepository.save(Todo.builder().title("Learn SQL").description("Finish a couple of courses on Udemy about SQL").completed(false).build());
		todoRepository.save(Todo.builder().title("Learn Docker").description("Finish a couple of courses on Linkedin Learning about Docker").completed(false).build());
		todoRepository.save(Todo.builder().title("Learn Javascript").description("Finish a course on Udemy for javascript").completed(false).build());
	}

	public static void main(String[] args) {
		SpringApplication.run(HowToDockerApplication.class, args);
	}
}
