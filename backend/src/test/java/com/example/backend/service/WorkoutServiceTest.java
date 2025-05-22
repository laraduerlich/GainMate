package com.example.backend.service;

import com.example.backend.model.Workout;
import com.example.backend.model.WorkoutDTO;
import com.example.backend.model.WorkoutIcon;
import com.example.backend.repo.WorkoutRepo;
import com.example.backend.security.AppUserService;
import com.example.backend.security.model.AppUserResponse;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WorkoutServiceTest {

    private final WorkoutRepo workoutRepo = mock(WorkoutRepo.class);
    private final IdService idService = mock(IdService.class);
    private final AppUserService appUserService = mock(AppUserService.class);

    // --------------------------------------- GET ALL --------------------------------------
    @Test
    void getAllWorkouts_shouldReturnEmptyList_whenCalledInitially() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService, appUserService);
        User user = new User("testUser", "testPassword", Collections.emptyList());
        List<Workout> expected = Collections.emptyList();
        when(workoutRepo.findAllById(Collections.emptyList())).thenReturn(expected);

        // WHEN
        List<Workout> actual = workoutService.getAllWorkouts(user);

        // THEN
        assertEquals(expected, actual);
    }

    // --------------------------------------- GET BY ID ------------------------------------
    @Test
    void getWorkoutById_shouldReturnWorkout_whenCalledWithValidId() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService, appUserService);
        String id = "1";
        Workout expected = Workout.builder()
                .id("1")
                .name("Test")
                .build();
        when(workoutRepo.findById(id)).thenReturn(Optional.of(expected));

        // WHEN
        Workout actual = workoutService.getWorkoutById(id);

        // THEN
        assertEquals(expected, actual);
    }

    @Test
    void getWorkoutById_shouldThrowException_whenCalledWithInvalidId() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService, appUserService);
        String id = "2";

        // WHEN & THEN
        try {
            workoutService.getWorkoutById(id);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Workout with id 2 does not exist", e.getMessage());
        }
    }

    // --------------------------------------- CREATE ---------------------------------------
    @Test
    void createWorkout_shouldReturnWorkout_whenCalledWithDTO() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService, appUserService);
        User user = new User("testUser", "testPassword", Collections.emptyList());
        AppUserResponse appUserResponse = AppUserResponse.builder().workoutIdList(new ArrayList<>()).build();
        WorkoutDTO workout = new WorkoutDTO("Test", WorkoutIcon.ARMS, List.of("1", "2", "3"), Collections.emptyList());
        Workout expected = Workout.builder()
                .id("1")
                .name("Test")
                .exerciseIdList(List.of("1", "2", "3"))
                .build();
        when(idService.generateId()).thenReturn("1");
        when(workoutRepo.save(expected)).thenReturn(expected);
        when(appUserService.findByUsername("testUser")).thenReturn(appUserResponse);
        doNothing().when(appUserService).updateUser(appUserResponse);


        // WHEN
        Workout actual = workoutService.createWorkout(workout, user);
        assertEquals(expected, actual);
    }

    @Test
    void createWorkout_shouldThrowException_whenWorkoutAlreadyExists() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService, appUserService);
        User user = new User("testUser", "testPassword", Collections.emptyList());
        WorkoutDTO workout = new WorkoutDTO("Test", WorkoutIcon.ARMS, List.of("1", "2", "3"), Collections.emptyList());
        when(workoutRepo.existsByName("Test")).thenReturn(true);

        // WHEN & THEN
        try {
            workoutService.createWorkout(workout, user);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Workout already exists", e.getMessage());
        }
    }

    // --------------------------------------- UPDATE --------------------------------------
    @Test
    void updateWorkout_shouldUpdateWorkout_whenCalledWithValidId() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService, appUserService);
        WorkoutDTO updatedWorkout = new WorkoutDTO("Test1", WorkoutIcon.ARMS, List.of("1", "2", "3"), Collections.emptyList());
        Workout expected = Workout.builder()
                .id("1")
                .name("Test1")
                .exerciseIdList(List.of("1", "2", "3"))
                .build();
        when(workoutRepo.existsById("1")).thenReturn(true);
        when(workoutRepo.save(expected)).thenReturn(expected);

        // WHEN
        Workout actual = workoutService.updateWorkout("1", updatedWorkout);

        // THEN
        assertEquals(expected, actual);
    }

    @Test
    void updateWorkout_shouldThrowException_whenWorkoutAlreadyExists() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService, appUserService);
        WorkoutDTO updatedWorkout = new WorkoutDTO("Test1", WorkoutIcon.ARMS, List.of("1", "2", "3"), Collections.emptyList());

        when(workoutRepo.existsById("1")).thenReturn(false);

        // WHEN & THEN
        try {
            workoutService.updateWorkout("1", updatedWorkout);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Workout with id 1 does not exist", e.getMessage());
        }

    }

    // --------------------------------------- DELETE --------------------------------------
    @Test
    void deleteWorkout_shouldDeleteWorkout_whenCalledWithValidId() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService, appUserService);
        User user = new User("testUser", "testPassword", Collections.emptyList());
        AppUserResponse appUserResponse = AppUserResponse.builder().workoutIdList(new ArrayList<>()).build();
        when(workoutRepo.existsById("1")).thenReturn(true);
        when(appUserService.findByUsername("testUser")).thenReturn(appUserResponse);
        doNothing().when(appUserService).updateUser(appUserResponse);

        // WHEN
        workoutService.deleteWorkout("1", user);

        // THEN
        verify(workoutRepo, times(1)).deleteById(anyString());
    }

    @Test
    void deleteWorkout_shouldThrowException_whenWorkoutDoesNotExist() {
        // GIVEN
        WorkoutService workoutService = new WorkoutService(workoutRepo, idService, appUserService);
        User user = new User("testUser", "testPassword", Collections.emptyList());
        String id = "2";

        when(workoutRepo.existsById(id)).thenReturn(false);

        // WHEN & THEN
        try {
            workoutService.deleteWorkout(id, user);
            fail("An exception is expected, but none is thrown!");
        } catch (Exception e) {
            assertEquals("Workout with id 2 does not exist", e.getMessage());
        }
    }


}
