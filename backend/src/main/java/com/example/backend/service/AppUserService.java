package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.exception.NotExistsException;
import com.example.backend.repo.AppUserRepo;
import com.example.backend.repo.ExerciseRepo;
import com.example.backend.repo.WorkoutRepo;
import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDTO;
import com.example.backend.security.model.AppUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepo appUserRepo;
    private final ExerciseRepo exerciseRepo;
    private final WorkoutRepo workoutRepo;

    private final PasswordEncoder passwordEncoder;
    private final IdService idService;

    public AppUser findByUsername(String username) throws UsernameNotFoundException {
        return appUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public AppUserResponse createUser(AppUserDTO newUser) throws AlreadyExistsException {
        if (appUserRepo.findByUsername(newUser.username()).isPresent()) {
            throw new AlreadyExistsException("User already exists!");
        } else {
            String password = passwordEncoder.encode(newUser.password());
            AppUser appUser = appUserRepo.save(AppUser.builder()
                    .id(idService.generateId())
                    .username(newUser.username())
                    .password(password)
                    .name(newUser.name())
                    .exerciseIdList(new ArrayList<>())
                    .workoutIdList(new ArrayList<>())
                    .build());
            return AppUserResponse.builder()
                    .username(appUser.username())
                    .name(appUser.name())
                    .build();
        }
    }

    public AppUserResponse updateUser(User user, AppUserDTO updatedUser) throws NotExistsException {
        AppUser appUser = appUserRepo.findByUsername(user.getUsername())
                .orElseThrow(() -> new NotExistsException("User" + user.getUsername() + "is not found"));

        // Check if the password was changed and encode the new one
        if (updatedUser.password() != null && !updatedUser.password().isBlank()) {
            String newPassword = passwordEncoder.encode(updatedUser.password());
            AppUser updated = AppUser.builder()
                    .id(appUser.id())
                    .password(newPassword)
                    .username(updatedUser.username() != null ? updatedUser.username() : appUser.username())
                    .name(updatedUser.name() != null ? updatedUser.name() : appUser.name())
                    .exerciseIdList(updatedUser.exerciseIdList() != null ? updatedUser.exerciseIdList() : appUser.exerciseIdList())
                    .workoutIdList(updatedUser.workoutIdList() != null ? updatedUser.workoutIdList() : appUser.workoutIdList())
                    .build();
            appUserRepo.save(updated);
            return AppUserResponse.builder()
                    .username(updated.username())
                    .name(updated.name())
                    .build();
        } else { // otherwise the old password will be used
            AppUser updated = AppUser.builder()
                    .id(appUser.id())
                    .password(appUser.password())
                    .username(updatedUser.username() != null ? updatedUser.username() : appUser.username())
                    .name(updatedUser.name() != null ? updatedUser.name() : appUser.name())
                    .exerciseIdList(updatedUser.exerciseIdList() != null ? updatedUser.exerciseIdList() : appUser.exerciseIdList())
                    .workoutIdList(updatedUser.workoutIdList() != null ? updatedUser.workoutIdList() : appUser.workoutIdList())
                    .build();
            appUserRepo.save(updated);
            return AppUserResponse.builder()
                    .username(updated.username())
                    .name(updated.name())
                    .build();
        }
    }

    public void deleteUser(User user) throws NotExistsException {
        AppUser appUser = appUserRepo.findByUsername(user.getUsername())
                .orElseThrow(() -> new NotExistsException("User" + user.getUsername() + "is not found"));

        // delete all workouts and exercises
        workoutRepo.deleteAllById(appUser.workoutIdList());
        exerciseRepo.deleteAllById(appUser.exerciseIdList());

        appUserRepo.delete(appUser);
    }
}
