# StackCart – MERN Stack CRUD Platform

## 📌 Overview

StackCart is a full-stack MERN application designed to demonstrate real-world backend and frontend development practices.  
It includes secure authentication, cloud-based image handling, product management, and a clean, responsive user interface.

This project is built with scalability, security, and production readiness in mind.

---

## ✨ Key Features

- 🔐 User registration & login using JWT authentication
- 🛡 Protected routes on both backend and frontend
- 👤 User profile management with avatar upload (Cloudinary)
- 📦 Product management (Create, Read, Update, Delete)
- 🖼 Cloud-based image uploads (no local storage dependency)
- 📄 Pagination support for product listing
- 🔄 Axios interceptors with automatic token refresh
- 📚 API documentation using Swagger
- 📱 Fully responsive UI with Tailwind CSS

---

## 🧰 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cloudinary
- Multer
- Swagger

### Frontend

- React (Vite)
- React Router
- Axios
- Tailwind CSS

### Deployment

- **Backend:** Render
- **Frontend:** Vercel
- **Database:** MongoDB Atlas

---

## 🔗 Live Links

- 🔌 **Backend API:** https://stackcart.onrender.com
- 🌐 **Frontend App:** https://stackcart-five.vercel.app
- 📘 **API Docs:** https://stackcart.onrender.com/api-docs

---

## 📂 Project Structure

```text
stackcart/
│
├── backend/              # Express + MongoDB REST API
├── frontend/             # React client (Vite)
└── README.md             # Project documentation
```

---

## 🚀 Local Setup

1️⃣ **Clone Repository**

```bash
git clone https://github.com/sonalghinaiya/mern-stackcart.git
cd mern-stackcart
```

2️⃣ **Backend Setup**

```bash
cd backend
npm install

Create a .env file (see backend/README.md) and then:

npm run dev
```

3️⃣ **Frontend Setup**

```bash
cd frontend
npm install


Create a .env file (see frontend/README.md) and then:

npm run dev
```

## 🧑‍💻 Author

**Sonal Ghinaiya**
