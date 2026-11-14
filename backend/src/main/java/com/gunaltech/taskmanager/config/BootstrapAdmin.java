package com.gunaltech.taskmanager.config;

import com.gunaltech.taskmanager.user.AppUser;
import com.gunaltech.taskmanager.user.Role;
import com.gunaltech.taskmanager.user.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BootstrapAdmin {
    @Bean
    CommandLineRunner createInitialAdmin(UserRepository users, PasswordEncoder encoder,
            @Value("${app.bootstrap-admin.email:}") String email,
            @Value("${app.bootstrap-admin.password:}") String password) {
        return args -> {
            if (email.isBlank() && password.isBlank()) return;
            if (email.isBlank() || password.isBlank() || password.length() < 12)
                throw new IllegalStateException("Set both bootstrap admin values; password must be at least 12 characters.");
            if (!users.existsByEmailIgnoreCase(email))
                users.save(new AppUser(email, encoder.encode(password), Role.ADMIN));
        };
    }
}