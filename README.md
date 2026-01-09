# Node Mongo CRUD API

A **production-ready backend API** built with **Node.js, Express, and MongoDB**, following a clean **MVC architecture**.  
This project demonstrates real-world backend engineering practices including **secure authentication**, **role-based authorization**, **file uploads**, **pagination**, **filtering**, **sorting**, **soft deletion**, and **AI chatbot integration**.

The codebase is structured, scalable, and suitable for **technical interviews** and **production use**.

---

## 🚀 Project Overview

This backend provides RESTful APIs for:

- **User Management**
- **Product Management**
- **AI Chatbot**

It emphasizes:

- Security best practices
- Maintainable architecture
- Clear separation of concerns
- Predictable and validated API behavior

---

## ✨ Features

### Core Backend

- RESTful APIs using Express
- MongoDB with Mongoose ODM
- Clean MVC folder structure
- Environment-based configuration
- Modular and scalable codebase

---

### Authentication & Authorization

- JWT-based authentication
  - Access Token (short-lived)
  - Refresh Token (long-lived)
- Refresh token stored securely in **httpOnly cookies**
- Token verification via middleware
- Role-Based Access Control (RBAC)
  - `user`
  - `admin`
- Ownership-based authorization
  - Users can update/delete only their own resources
  - Admin can manage all users and products

---

### Validation & Error Handling

- Request validation using **Zod**
- Centralized error handling middleware
- Consistent API response format
- No sensitive information leaked in errors

---

### File Uploads & Media Handling

- Multer-based file uploads
- User profile image upload
- Product image upload
- Image replacement on update
- Old image cleanup on update/delete
- Local file storage under `/public/uploads`

---

### Data Handling

- Pagination using query parameters
- Filtering (users & products)
- Sorting (users & products)
- Soft delete using `isDeleted` flag
- Soft-deleted records excluded from queries by default

---

### Security

- Password hashing with bcrypt
- HTTP security headers using Helmet
- Rate limiting for authentication routes
- CORS configuration with credentials support
- Secure cookies in production environment

---

### AI Chatbot Integration

- Chat endpoint (`/api/chat`)
- Auth-protected chatbot access
- AI service abstraction layer
- Gemini/OpenAI-ready implementation
- Secure API key handling via environment variables

---

### API Documentation

- Swagger UI (OpenAPI 3.0)
- Interactive API documentation
- Clear request/response schemas

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Zod
- **File Uploads:** Multer
- **Security:** Helmet, bcrypt, express-rate-limit
- **AI Integration:** Gemini / OpenAI (service-based)
- **Documentation:** Swagger UI

---

## 📁 Folder Structure

```
/ (root)
├── controllers/ # Business logic
├── middlewares/ # Auth, error handling, rate limiting
├── models/ # Mongoose schemas
├── routes/ # Express routers
├── services/ # AI / external services
├── utils/ # JWT helpers
├── validators/ # Zod schemas
├── config/ # Database configuration
├── public/uploads/ # Uploaded images
├── swagger/ # OpenAPI spec
├── index.js # Application entry point
└── package.json
```

---

## 🔐 Authentication Flow (JWT)

1. User logs in
2. Server generates:
   - **Access Token** (returned in response)
   - **Refresh Token** (stored in httpOnly cookie)
3. Client sends access token in request headers:
   - Authorization: Bearer <token>
4. `isAuthenticated` middleware:

- Verifies JWT
- Attaches decoded user data to `req.user`

5. Protected routes enforce:

- Authentication
- Role-based access
- Ownership checks

---

## Validation Strategy (Zod)

- All incoming request bodies are validated using Zod schemas
- Validation occurs before controller execution
- Ensures predictable data structure
- Prevents malformed or malicious input
- Validation errors are handled centrally

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

## ⚙️ Environment Variables (.env.example)

```bash

PORT=8000
MONGODB_URI=mongodb://localhost:27017/node-crud
JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
```

---

## ▶️Setup & Run Instructions

1. Clone the repo:
   ```bash
   git clone <repo_url>
   cd node-mongo-crud-api
   npm install
   ```
2. Create a .env file using the example above
3. Start the development server:
   ```bash
   npm run dev
   ```
4. API base URL:
   `http://localhost:8000`
5. Swagger documentation:
   ```
   http://localhost:8000/api-docs
   ```

---

## 🔒 Protected Routes

- All create, update, and delete operations require authentication
- Authorization checks ensure:
  - Users can manage only their own data
  - Admin users can manage all resources
- Invalid or missing tokens return 401 Unauthorized

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

### 🤖 Chat API Example

```bash
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "What is Node.js?"
}
```

---

## 📌 Notes

- This project is intentionally backend-focused
- Designed to integrate easily with React or Next.js frontends
- Codebase follows real-world backend standards
- Suitable for interview demonstration and further extension

---

## 👩‍💻 Author

Sonal Ghinaiya
