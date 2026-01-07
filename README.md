# Node Mongo CRUD API

## Overview

Production-grade Node.js + Express REST API using MongoDB, secure JWT authentication, role-based access control, ownership authorization, request validation, and Swagger documentation.

---

## 🚀 Features

### Authentication & Security
- JWT-based authentication
  - Access Token (short-lived)
  - Refresh Token (long-lived)
- Refresh token stored securely in **httpOnly cookies**
- Token verification using middleware
- Role-Based Access Control (RBAC)
  - `user` and `admin` roles
- Ownership-based authorization
  - Users can update/delete only their own data
  - Admin can manage all resources

### User Management
- User registration with profile image upload
- Login, logout, and token refresh
- Update user profile (including profile image replacement)
- Delete user account with automatic image cleanup

### Product Management
- Product CRUD operations
- Product image upload
- Ownership checks for update/delete
- Admin override support

### Validation & Error Handling
- Request body validation using **Zod**
- Centralized error handling middleware
- Clear and consistent API error responses

### File Uploads
- Image upload using **Multer**
- Separate folders for users and products
- File type & size validation
- Old image cleanup on update/delete
- Static file serving via `/uploads/*`

### API Documentation
- Swagger (OpenAPI 3.0)
- JSON-based Swagger configuration
- Accessible at `/api-docs`

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Zod (validation)
- bcrypt (password hashing)
- Helmet & CORS
- Multer (file uploads)
- Swagger (OpenAPI 3.0)
- cookie-parser
- ES Modules

---

## 📂 Folder Structure

```
/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── validators/
├── utils/
├── config/
├── public/
│ └── uploads/
│ ├── users/
│ └── products/
├── swagger/
│ └── swagger.json
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
  - Stored in **httpOnly cookie**
  - Used to generate a new access token
  - Automatically invalidated on logout

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
NODE_ENV=development
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
