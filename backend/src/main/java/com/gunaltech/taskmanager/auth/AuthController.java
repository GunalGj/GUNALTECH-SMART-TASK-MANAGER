package com.gunaltech.taskmanager.auth;

import com.gunaltech.taskmanager.security.JwtService;
import com.gunaltech.taskmanager.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthController(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users; this.encoder = encoder; this.jwt = jwt;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        var user = users.findByEmailIgnoreCase(request.email())
                .filter(u -> u.isEnabled() && encoder.matches(request.password(), u.getPasswordHash()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        return new LoginResponse(jwt.generateToken(user), "Bearer", 3600,
                user.getId(), user.getEmail(), user.getRole().name());
    }

    @GetMapping("/me")
    public Object me(org.springframework.security.core.Authentication authentication) {
        return users.findByEmailIgnoreCase(authentication.getName())
                .map(u -> java.util.Map.of("id", u.getId(), "email", u.getEmail(), "role", u.getRole().name()))
                .orElseThrow(() -> new BadCredentialsException("User not found"));
    }
}