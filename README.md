# Node Mongo CRUD API

## Overview
A professional Node.js backend REST API using Express.js and MongoDB, designed with modern development practices for authentication, authorization, validation, and error handling.

---

## Features
- **User Authentication** with JWT (access & refresh tokens)
- **User & Product CRUD APIs** (Create, Read, Update, Delete)
- **Express.js + MongoDB (Mongoose)**
- **Request Validation** using Zod
- **Centralized Error Handling**
- **RBAC (Role-Based Access Control)** for admin/user
- **Ownership-Based Authorization** (users manage their own data)
- **MVC Project Structure for Maintainability**

---

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)
- Zod (validation)
- Modern ES module syntax

---

## Folder Structure
```
/
├── controllers/         # Route handlers and business logic
├── middlewares/         # Auth, RBAC, error handling logic
├── models/              # Mongoose schemas/models
├── routes/              # REST API route definitions
├── utils/               # JWT/token and helper functions
├── validators/          # Zod schemas & validation middleware
├── config/              # Database and environment setup
├── index.js             # App entry point
└── package.json
```

---

## Authentication & Authorization Flow

- **Access Token:**  
  - Issued on successful login/register.
  - Sent by clients via `Authorization: Bearer <token>` header.
  - Short expiry for security.

- **Refresh Token:**  
  - Issued alongside access token.
  - Stored in `httpOnly` cookies for security (prevents JavaScript access).
  - Used to obtain new access tokens without re-authentication.

- **RBAC & Ownership:**  
  - Each user has a role: `user` or `admin`.
  - Admins can access all resources.
  - Users can only update/delete their own records (ownership checks).
  - Middleware enforces role and ownership constraints.

---

## Request Validation

- All incoming request bodies (user/product) are validated against strict Zod schemas.
- Validation is performed through middleware.
- Invalid payloads are automatically rejected with clear error messages (never expose stack traces).

---

## API Response Format

All responses are:
```json
{
  "success": true,    // or false
  "message": "Info about the outcome",
  "data": { ... }     // any returned data, if applicable
}
```
On error:
```json
{
  "success": false,
  "message": "Reason for failure"
}
```

---

## Environment Variables (`.env`)

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## How to Run Locally

1. Clone the repo:
   ```bash
   git clone <repo_url>
   cd node-mongo-crud-api
   npm install
   ```
2. Create `.env` using `.env.example` and fill in your values.
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Security Considerations

- JWTs are signed and verified using a strong secret.
- Refresh tokens are `httpOnly` cookies (mitigates XSS).
- Access and modification of data strictly limited by role and ownership.
- Input validation prevents malicious payloads.
- Centralized error handling ensures no sensitive data is exposed.

---

## Author

Sonal Ghinaiya
