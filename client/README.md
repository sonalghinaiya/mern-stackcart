# Frontend – node-mongo-crud-api/frontend

## Overview

A modern client-side SPA built with React and Tailwind CSS for the Node Mongo CRUD API platform.  
Provides authentication flow, user profile, product management, and mobile-first UX.

---

## ✨ Features

- User registration & login forms (JWT auth)
- Profile management with image/avatar update
- Protected routes (redirect on invalid auth)
- Token storage & auto-refresh with Axios interceptors
- Product CRUD: list, add, edit, delete
- Product images (Cloudinary hosted)
- Pagination for product lists
- Responsive UI (Tailwind CSS)
- Alerts, modals, and basic 404 error handling

---

## 🔑 Auth Flow

- Logins/registrations receive JWT tokens
- Access token in React state/localStorage
- Refresh token managed via cookie (httpOnly)
- Axios interceptors auto-attach access token
- On 401, token refresh is attempted; logout on failure

---

## 🗂️ Folder Structure

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── routes/
│   ├── utils/
│   └── App.js
├── public/
└── package.json
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure:

```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_CLOUDINARY_PRESET=your_unsigned_upload_preset  # if using unsigned uploads
```

---

## 🚀 Running Locally

```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

---

## 🔐 Security & Best Practices

- All sensitive data handled on server
- JWT/refresh in secure storage/cookie
- No hardcoded secrets in client code
- Axios interceptor prevents token leaks

---

## 👤 Author

**Sonal Ghinaiya**
