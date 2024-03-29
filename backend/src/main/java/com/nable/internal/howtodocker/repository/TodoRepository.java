package com.nable.internal.howtodocker.repository;

import com.nable.internal.howtodocker.repository.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = { "http://localhost", "http://localhost:3000", "http://frontend-service", "http://frontend-service:3000" })
public interface TodoRepository extends JpaRepository<Todo, Integer> {
}
