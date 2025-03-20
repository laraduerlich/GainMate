package com.example.backend.repo;

import com.example.backend.model.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExerciseRepo extends MongoRepository<Exercise, String> {
}
