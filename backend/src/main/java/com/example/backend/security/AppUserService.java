package com.example.backend.security;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDTO;
import com.example.backend.security.model.AppUserResponse;
import com.example.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepo appUserRepo;
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
}
