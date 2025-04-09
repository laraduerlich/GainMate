package com.example.backend.security;

import com.example.backend.security.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepo extends MongoRepository<AppUser, String> {

    Optional<AppUser> findByUsername(String username);
}
