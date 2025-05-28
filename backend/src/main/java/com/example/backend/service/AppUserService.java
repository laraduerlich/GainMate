package com.example.backend.service;

import com.example.backend.exception.AlreadyExistsException;
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

    public AppUserResponse findByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return AppUserResponse.builder()
                .id(appUser.id())
                .username(appUser.username())
                .name(appUser.name())
                .exerciseIdList(appUser.exerciseIdList())
                .workoutIdList(appUser.workoutIdList())
                .build();
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

    public void updateUser(AppUserResponse updatedAppUserResponse) throws UsernameNotFoundException {
        AppUser user = appUserRepo.findByUsername(updatedAppUserResponse.username())
                .orElseThrow(() -> new UsernameNotFoundException(updatedAppUserResponse.username()));

        AppUser updated = AppUser.builder()
                .id(user.id())
                .username(user.username())
                .password(user.password())
                .name(user.name())
                .exerciseIdList(updatedAppUserResponse.exerciseIdList())
                .workoutIdList(updatedAppUserResponse.workoutIdList())
                .build();
        appUserRepo.save(updated);
    }

    public void deleteUser(User user) throws UsernameNotFoundException {
        AppUser appUser = appUserRepo.findByUsername(user.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException(user.getUsername()));

        // delete all workouts and exercises
        workoutRepo.deleteAllById(appUser.workoutIdList());
        exerciseRepo.deleteAllById(appUser.exerciseIdList());

        appUserRepo.delete(appUser);
    }
}
