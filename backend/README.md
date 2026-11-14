# GUNALTECH Smart Task Manager — Backend

Spring Boot REST API foundation for Admin, Employee, and Customer authentication.

## Included
- Java 17 + Spring Boot 3.4
- MySQL + Spring Data JPA user entity
- BCrypt password hashing
- Stateless JWT bearer-token authentication
- Role authorities: ADMIN, EMPLOYEE, CUSTOMER
- Login endpoint and authenticated current-user endpoint
- Optional one-time bootstrap Admin from environment variables

## Configure locally
Create the MySQL database or allow the configured JDBC URL to create it. Set environment variables before running:

- `DB_URL` — JDBC URL
- `DB_USERNAME` and `DB_PASSWORD`
- `JWT_SECRET` — Base64-encoded random secret, at least 32 bytes before Base64 encoding
- `BOOTSTRAP_ADMIN_EMAIL`
- `BOOTSTRAP_ADMIN_PASSWORD` — at least 12 characters

Generate a JWT secret with: `openssl rand -base64 32`

Never commit real passwords, tokens, or production secrets. The bootstrap Admin is created only when both bootstrap values are supplied and the email does not already exist.

## Run
From this directory: `mvn spring-boot:run`

## API
- `POST /api/auth/login` — public; JSON body: `{"email":"admin@example.com","password":"..." }`
- `GET /api/auth/me` — requires `Authorization: Bearer <accessToken>`

A successful login returns a JWT and the user's role. This is an initial authentication foundation, not the complete application. User provisioning, role-specific authorization rules, customer-to-project ownership, refresh-token rotation, rate limiting, and integration tests are next steps.
