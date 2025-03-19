package com.example.backend.repo;

import com.example.backend.model.Excercise;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExerciseRepo extends MongoRepository<Excercise, String> {
}
