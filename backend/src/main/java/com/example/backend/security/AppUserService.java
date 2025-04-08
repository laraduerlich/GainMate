package com.example.backend.security;

import com.example.backend.exception.AlreadyExistsException;
import com.example.backend.security.model.AppUser;
import com.example.backend.security.model.AppUserDTO;
import com.example.backend.security.model.AppUserResponse;
import com.example.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final IdService idService;

    public AppUserResponse findByUsername(String username) {
        AppUser appUser = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return AppUserResponse.builder()
                .username(appUser.username())
                .name(appUser.name())
                .exerciseIdList(appUser.exerciseIdList())
                .workoutIdList(appUser.workoutIdList())
                .build();
    }

    public AppUserResponse createUser(AppUserDTO newUser) throws AlreadyExistsException {
        if (appUserRepository.findByUsername(newUser.username()).isPresent()) {
            throw new AlreadyExistsException("User already exists!");
        } else {
            String password = passwordEncoder.encode(newUser.password());
            AppUser appUser = appUserRepository.save(AppUser.builder()
                    .id(idService.generateId())
                    .username(newUser.username())
                    .password(password)
                    .name(newUser.name())
                    .build());
            return AppUserResponse.builder()
                    .username(appUser.username())
                    .name(appUser.name())
                    .build();
        }
    }
}
