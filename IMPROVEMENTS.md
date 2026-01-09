# Improvements & TODOs

This document lists **future improvements and missing features** identified after reviewing the current codebase.  
All items below are **NOT implemented yet** and are prioritized based on **production readiness, scalability, and maintainability**.

---

## 🟥 Must-Have (Production Critical)

### 1. Refresh Token Persistence & Rotation
**Why:**  
Currently refresh tokens are generated and stored in cookies but **not persisted in the database**.

**What to add:**
- Store refresh tokens in the database
- Implement refresh token rotation
- Invalidate old refresh tokens on logout
- Protect against token replay attacks

**Priority:** High

---

### 2. Environment Variable Validation
**Why:**  
The app currently assumes all env variables exist.

**What to add:**
- Validate required env variables on startup
- Fail fast if any critical variable is missing
- Use libraries like `zod`, `envalid`, or `joi`

**Priority:** High

---

### 3. API Rate Limiting Granularity
**Why:**  
Rate limiting exists but can be more granular.

**What to add:**
- Different rate limits per route group
- Stricter limits for login & refresh
- Relaxed limits for read-only routes

**Priority:** High

---

## 🟪 Good-to-Have (Quality & Stability)

### 4. Structured Logging
**Why:**  
Console logging is not sufficient for production debugging.

**What to add:**
- HTTP request logging (`morgan`)
- Structured logs (`winston` or `pino`)
- Log levels (info, warn, error)
- Error correlation IDs

**Priority:** Medium

---

### 5. Health Check Endpoint
**Why:**  
Required for load balancers, uptime monitors, and deployments.

**What to add:**
- `/health` or `/status` endpoint
- Check:
  - Server uptime
  - MongoDB connection status

**Priority:** Medium

---

### 6. Automated Testing
**Why:**  
No automated tests currently exist.

**What to add:**
- Unit tests (controllers & utils)
- Integration tests (API flows)
- Test authentication, RBAC, soft delete logic
- Tools:
  - Jest
  - Supertest

**Priority:** Medium

---

## 🟩 Optional / Advanced (Scalability & DevOps)

### 7. CI/CD Pipeline
**Why:**  
Automates quality checks and deployments.

**What to add:**
- GitHub Actions pipeline
- Run:
  - Tests
  - Linting
  - Build checks
- Optional auto-deploy

**Priority:** Low

---

### 8. Dockerization
**Why:**  
Simplifies deployment and onboarding.

**What to add:**
- Dockerfile
- `.dockerignore`
- `docker-compose.yml` (Node + MongoDB)

**Priority:** Low

---

### 9. Caching Layer
**Why:**  
Improve performance for frequently accessed data.

**What to add:**
- Redis caching for:
  - Product listings
  - User profiles
- Cache invalidation on update/delete

**Priority:** Low

---

### 10. API Versioning
**Why:**  
Required for long-term backward compatibility.

**What to add:**
- Introduce `/api/v1`
- Prepare for future breaking changes

**Priority:** Low

---

## ✅ Already Implemented (Not Listed Above)

- JWT authentication (access + refresh tokens)
- Cookie-based refresh token handling
- RBAC (admin / user)
- Ownership-based authorization
- Zod validation
- Centralized error handling
- Helmet & CORS
- Rate limiting
- File uploads (users & products)
- Pagination, filtering & sorting
- Soft delete support
- Swagger API documentation
- Modular MVC architecture

---

## 📌 Notes

This improvement list is intentionally **realistic and interview-grade**.  
No already-implemented features are repeated, and no imaginary features are introduced.

This file should evolve as features move from **TODO → Completed** and get documented in `README.md`.
