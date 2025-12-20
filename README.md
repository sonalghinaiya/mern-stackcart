# Node Mongo CRUD API

## Overview
A production-ready Node.js backend REST API for users and products using Express.js and MongoDB, following modern architecture and professional engineering standards.

---

## Features
- **User authentication** (JWT Bearer token)
- **User & Product CRUD APIs**
- **Express.js + MongoDB (Mongoose)**
- **Request validation via Zod middleware**
- **Centralized error handling**
- **Standard, predictable API responses**

## Tech Stack
- Node.js / Express.js
- MongoDB (Mongoose)
- Zod (validation)
- JSON Web Token (JWT)
- Modern ES module syntax

---

## Folder Structure
```
/ (root)
├── controllers/         # Route logic
├── middlewares/         # isAuthenticated, errorHandler
├── models/              # Mongoose Schemas
├── routes/              # Express routers
├── utils/               # JWT helpers
├── validators/          # Zod schemas & validation middleware
├── config/              # Database conn
├── index.js             # Entry point
└── package.json
```

---

## Authentication Flow (JWT)
- On register/login: User receives a signed JWT token.
- Clients send the token in `Authorization: Bearer <token>` header.
- `isAuthenticated` middleware verifies the token, attaches user info to request, or denies access.
- Protected routes use this middleware to ensure only authenticated users access them.

---

## Validation Strategy (Zod)
- All incoming user and product data is validated against strong Zod schemas.
- Validation is implemented as reusable Express middleware.
- Validation errors are forwarded to centralized error handling and never leak internal details.
- This protects API integrity, prevents malicious input, and maintains predictable data structures.

---

## API Response Format
All standard responses are in this form:
```json
{
  "success": true/false,
  "message": "String message",
  "data": { ... }
}
```
Errors always include `success: false` and an error message.

Example (success):
```json
{
  "success": true,
  "data": { ... }
}
```
Example (error):
```json
{
  "success": false,
  "message": "Validation failed"
}
```

---

## Setup & Run Instructions
1. Clone the repo:
    ```bash
    git clone <repo_url>
    cd node-mongo-crud-api
    npm install
    ```
2. Create your `.env` file:
    ```env
    MONGODB_URI=your_mongodb_connection
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=1d
    ```
3. Start the server:
    ```bash
    npm run dev
    ```

---

## How Protected Routes Work
- Non-authenticated users are denied access to operations like updating/deleting users and creating/updating/deleting products.
- All protected routes use the `isAuthenticated` middleware to enforce token verification.
- Attempting to access a protected route without a valid Bearer token results in a 401 Unauthorized error.

---

## Example API Usage
### Register
```bash
POST /api/auth/register
{
  "firstName": "Alice",
  "email": "alice@mail.com",
  "password": "password123"
}
```
### Login
```bash
POST /api/auth/login
{
  "email": "alice@mail.com",
  "password": "password123"
}
```
Returns: `{ success, token, data: { user } }`

---

## Author
Sonal Ghinaiya
