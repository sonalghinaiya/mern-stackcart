# Improvements & TODOs

Production-critical items are listed first, followed by quality and scalability enhancements.

---

## 🟥 Must-have (Production Critical)

- **Security Headers:** Implement `helmet` and configure `CORS`.
- **Request Rate Limiting:** Use `express-rate-limit` for brute-force protection, especially on authentication endpoints (`/login`, `/register`, `/refresh`).
- **Automated Testing:** Set up Jest + Supertest. Add tests for authentication, authorization, and CRUD flows.
- **Production Cookie Security:** Enable `cookie.secure = true` in production environments.

---

## 🟪 Good-to-have

- **Logging:** Add `morgan` for HTTP logs and `winston` for structured application logs.
- **Environment Variable Validation:** Fail fast on missing or invalid env variables.
- **Swagger Schema Reuse:** Centralize response and error schemas using `$ref`.
- **Health Check Endpoint:** `/health` or `/status` for uptime monitoring and load balancers.

---

## 🟩 Optional / Advanced

- **CI/CD Pipeline:** GitHub Actions for linting, testing, and deployment.
- **Docker & Compose:** Dockerfile, `.dockerignore`, and docker-compose setup.
- **Caching Layer:** Redis for frequently accessed data.
- **API Versioning:** Introduce `/api/v1` when backward compatibility is required.
- **Pagination & Filtering:** For scalable list endpoints.

---

**Already implemented:**  
JWT authentication (access + refresh tokens), cookie-based refresh handling, RBAC, ownership checks, Zod validation, Swagger documentation, centralized error handling, modular architecture.
