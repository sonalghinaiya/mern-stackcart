# Project Roadmap

This roadmap outlines the **planned enhancements and future scope** of the Node Mongo CRUD API project.  
It reflects the current implementation status and prioritizes features based on **security, scalability, and real-world usage**.

---

## ✅ Completed (Current State)

The following features are already implemented and stable:

- JWT Authentication (Access Token + Refresh Token)
- Refresh token stored in httpOnly cookies
- User & Product CRUD APIs
- Role-Based Access Control (RBAC)
- Ownership-based authorization
- Zod-based request validation
- Centralized error handling middleware
- Swagger API documentation (OpenAPI 3.0)
- Modular MVC architecture
- Secure password hashing (bcrypt)

---

## 🟥 Phase 1 – Security & Stability (High Priority)

Focus: Hardening the API for production use.

- Add HTTP security headers using `helmet`
- Configure CORS with allowed origins and credentials
- Implement request rate limiting using `express-rate-limit`
  - Apply stricter limits on:
    - `/api/auth/login`
    - `/api/auth/register`
    - `/api/auth/refresh`
- Enable secure cookies in production (`secure: true`)
- Improve refresh token handling:
  - Store refresh tokens in database
  - Support token revocation on logout
  - Implement refresh token rotation

---

## 🟪 Phase 2 – File Uploads & Media Handling

### 👤 User Profile Image Upload
- Upload and store user profile pictures
- Validate file type and size
- Save image path in user document
- Replace or delete old images
- Support:
  - Local storage (development)
  - Cloud storage (Cloudinary / AWS S3) for production

### 🛍 Product Image Upload
- Upload product images
- Associate images with product records
- Support multiple images (optional)
- Secure upload endpoints
- Image optimization and compression

---

## 🟦 Phase 3 – Chatbot & AI Integration

### 🤖 Chatbot Integration
- Add chatbot API endpoint (`/api/chat`)
- Integrate with AI services (OpenAI / Gemini / others)
- Support:
  - Product-related queries
  - General support questions
- Secure AI API keys via environment variables

### 🔔 Optional Enhancements
- Store chat history
- Role-based chatbot responses (admin vs user)

---

## 🟩 Phase 4 – Quality, Monitoring & Observability

- HTTP request logging using `morgan`
- Structured logging using `winston` or `pino`
- Add health check endpoint:
  - `/health` or `/status`
  - Include database connectivity check
- Environment variable validation at startup
- Fail fast on missing or invalid configuration

---

## 🟨 Phase 5 – API & Data Enhancements

- Pagination, filtering, and sorting for:
  - Users list
  - Products list
- API versioning (`/api/v1`)
- Soft delete support instead of hard deletes
- Consistent global API response format

---

## 🧪 Phase 6 – Testing & CI/CD

- Unit testing using Jest
- API integration testing using Supertest
- Test coverage for:
  - Authentication flows
  - RBAC & ownership rules
  - Validation failures
- Linting with ESLint + Prettier
- CI/CD pipeline using GitHub Actions:
  - Run tests and lint on pull requests

---

## 🚀 Phase 7 – Frontend Integration

- React or Next.js frontend integration
- Implement authentication flow on frontend
- Handle access token refresh automatically
- Protected routes and role-based UI
- Optional:
  - Server-Side Rendering (SSR) with Next.js

---

## 🧠 Phase 8 – Advanced & Optional Features

- Real-time communication using Socket.IO
  - Notifications
  - Live chat
- Webhooks for event-based notifications
- Payment gateway integration (Stripe / Razorpay)
- Background jobs using Bull / Agenda
- Caching layer using Redis

---

## 🎯 Suggested Next Steps

Recommended immediate focus:
1. Add `helmet` + rate limiting
2. Implement file uploads (user & product images)
3. Integrate frontend (React / Next.js)
4. Add chatbot functionality

---

## 📌 Notes

This roadmap is intended to evolve as the project grows.  
Completed features should be removed from future phases and documented in `README.md`.