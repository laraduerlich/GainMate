package com.example.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureMockMvc
class AuthorizationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    AppUserRepository repo;

    // --------------------------------------- GET USER ---------------------------------------
    @Test
    void getCurrentUser_shouldReturnUserDto_whenUserValid() throws Exception {
        // GIVEN
        String username = "testuser";

        repo.save(AppUser.builder().name("test").username(username).build());

        // WHEN & THEN
        mockMvc.perform(get("/api/auth/me")
                        .with(user(username)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("test"));
    }

    @Test
    void getCurrentUser_shouldThrowException_whenUserInvalid() throws Exception {
        // GIVEN
        String username = "testuser";

        // WHEN & THEN
        mockMvc.perform(get("/api/auth/me")
                        .with(user(username)))
                .andExpect(status().isUnauthorized());
    }

    // --------------------------------------- REGISTER ---------------------------------------
    @Test
    @WithMockUser
    void registerUser_shouldReturnUserDto() throws Exception {
        // GIVEN
        String username = "testuser";

        // WHEN & THEN
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "username": "testuser",
                        "password": "testpassword",
                        "name": "test"
                        }
"""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("test"));
    }

    @Test
    @WithMockUser
    void registerUser_shouldThrowException_whenUsernameIsAlreadyUsed() throws Exception {
        // GIVEN
        String username = "testuser";
        repo.save(AppUser.builder().name("test").username(username).build());

        // WHEN & THEN
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "username": "testuser",
                        "password": "testpassword",
                        "name": "test"
                        }
"""))
                .andExpect(status().isBadRequest());
    }

    // --------------------------------------- LOGOUT ---------------------------------------
    @Test
    @WithMockUser
    void logoutUser_shouldCleanSession_whenUserValid() throws Exception {
        // GIVEN
        MockHttpSession session = new MockHttpSession();

        session.setAttribute("someAttribute", "someValue");
        assertThat(session.getAttribute("someAttribute")).isEqualTo("someValue");

        // WHEN
        mockMvc.perform(post("/logout")
                        .session(session))
                .andExpect(status().isNoContent());

        // THEN
        assertThat(session.isInvalid()).isTrue();
    }
}
