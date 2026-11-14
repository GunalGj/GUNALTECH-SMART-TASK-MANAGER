package com.gunaltech.taskmanager.auth;

public record LoginResponse(String accessToken, String tokenType, long expiresInSeconds,
                             Long userId, String email, String role) {}