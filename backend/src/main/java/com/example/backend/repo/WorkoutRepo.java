package com.example.backend.repo;

import com.example.backend.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutRepo extends MongoRepository<Workout, String> {

    boolean existsByName(String name);

}
