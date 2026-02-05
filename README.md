# MERN Stack CRUD Platform

## Overview

This project is a modern full-stack CRUD platform built with the MERN stack (MongoDB, Express.js, React, Node.js).  
It provides secure user authentication, cloud-based image uploads, product management, and responsive UI with production-ready best practices.

---

## 🎨 Features

- User registration & login (JWT-based authentication)
- Protected routes (backend & frontend)
- User profile with avatar upload (Cloudinary integration)
- Product CRUD: add, edit, delete, list
- Secure image uploads
- MongoDB Atlas as managed DB
- Backend deployed on Render
- Frontend consumes API via Axios
- Axios interceptors with token refresh logic
- Product listing supports pagination
- Modern UI with Tailwind CSS

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, Cloudinary
- **Frontend:** React, React Router, Axios, Tailwind CSS
- **Hosting:** Render (backend), Vercel(frontend)

---

## 📁 Folder Structure

```
node-mongo-crud-api/
│
├── backend/             # Express/MongoDB REST API
├── frontend/            # React client
└── README.md            
```

---

## 🚀 Getting Started

1. **Clone this repo:**
   ```bash
   git clone <repo-url>
   cd node-mongo-crud-api
   ```

2. **Setup backend:**
   ```bash
   cd backend
   npm install
   # Create .env (see backend/README.md)
   npm run dev
   ```

3. **Setup frontend:**
   ```bash
   cd frontend
   npm install
   # Create .env (see frontend/README.md)
   npm start
   ```

4. **Access the app** via `http://localhost:3000` (default) and API docs at `/api-docs` (backend).

---

## 👤 Author

**Sonal Ghinaiya**
