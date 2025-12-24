# Node Mongo CRUD API

## Overview

Production-grade Node.js + Express REST API using MongoDB, secure JWT authentication, role-based access control, ownership authorization, request validation, and Swagger documentation.

---

## 🚀 Features

- **JWT Authentication**
  - Access token (short-lived)
  - Refresh token (httpOnly cookie)
- **User & Product CRUD APIs**
- **Role-Based Access Control (RBAC)** (`user`, `admin`)
- **Ownership-based authorization**
- **Zod-based request validation**
- **Centralized error handling**
- **Swagger UI documentation**
- **Modular MVC folder structure**

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Zod (validation)
- bcrypt (password hashing)
- Swagger (OpenAPI 3.0)
- cookie-parser
- ES Modules

---

## 📂 Folder Structure

```
/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── validators/
├── config/
├── index.js
└── package.json
```

---

## 🔐 Authentication & Authorization Flow

- **Access Token**

  - Short-lived JWT
  - Sent via `Authorization: Bearer <token>`
  - Used to access protected APIs

- **Refresh Token**

  - Long-lived JWT
  - Stored securely in `httpOnly` cookie
  - Used to generate new access tokens without re-login

- **RBAC**

  - Role-based permissions (`user`, `admin`)
  - Admin can manage all users and products

- **Ownership**
  - Users can update/delete only their own resources
  - Enforced at controller level

---

## 🔍 Request Validation

- All incoming request bodies are validated using **Zod**
- Invalid input returns clear, descriptive error messages
- Separate validation schemas for:
  - Authentication
  - Products

---

## 📘 API Documentation

- **Swagger UI:**  
  Visit [http://localhost:8000/api-docs](http://localhost:8000/api-docs)
- **OpenAPI 3.0**: Docs include tagged endpoints, input, responses, auth requirements.

---

## 📌 API Endpoints Overview

### Auth

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | /api/auth/register | Register new user       |
| POST   | /api/auth/login    | Login & generate tokens |
| POST   | /api/auth/refresh  | Refresh access token    |
| POST   | /api/auth/logout   | Logout user             |

### Users

| Method | Endpoint       | Access        |
| ------ | -------------- | ------------- |
| GET    | /api/users     | Admin         |
| GET    | /api/users/:id | Authenticated |
| PATCH  | /api/users/:id | Owner / Admin |
| DELETE | /api/users/:id | Owner / Admin |

### Products

| Method | Endpoint          | Access        |
| ------ | ----------------- | ------------- |
| GET    | /api/products     | Public        |
| GET    | /api/products/:id | Public        |
| POST   | /api/products     | Authenticated |
| PATCH  | /api/products/:id | Owner / Admin |
| DELETE | /api/products/:id | Owner / Admin |

---

## 🔒 Security Notes

- Passwords are hashed using bcrypt
- Refresh tokens stored in httpOnly cookies
- Access tokens are short-lived
- RBAC and ownership checks prevent unauthorized access

---

## 🌍 Environment Variables

```
PORT=8000
MONGODB_URI=
JWT_SECRET=
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## ▶️ Run Locally


1. Clone this repo & install dependencies:
   ```
   git clone <repo-url>
   cd node-mongo-crud-api
   npm install
   ```
2. Create `.env` and fill in variables.
3. Start server:
   ```
   npm run dev
   ```

---

## 📌 Project Status

✔ Core backend complete  
✔ Authentication & authorization implemented  
✔ Swagger documentation available

Planned enhancements are listed in `IMPROVEMENTS.md`.

---

## 👤 Author

**Sonal Ghinaiya**
