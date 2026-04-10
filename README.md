# 🚀 Frontend Authentication & User Dashboard

This project is a frontend application built using **Next.js/React**, implementing user authentication and a user listing dashboard. It connects to a backend server to handle registration, login, and fetching user data.
Please dont modify the server side code and perform your frontend side task only. If you modify the server side code, your task wont be reviewed.

## ⚙️ Installation & Setup

## 🔗 Backend Setup
clone this repository
Make sure the backend server is running:

```bash
npm install
npm run dev
```

Backend runs on:
http://localhost:5000

Swagger API documentation:
http://localhost:5000/api-docs

Frontend Task:

## 🔐 Authentication Flow

1. User must **register first**
2. After successful registration, user can **log in**
3. On login:

   * Token is stored in localStorage
   * User is redirected to homepage
4. Unauthorized users are redirected to login page

---

## 📄 Pages

* **Register Page**

  * Form built using react-hook-form
  * Uses shadcn input, button, and form components

* **Login Page**

  * Validates user credentials
  * Stores authentication token

* **Home Page**

  * Protected route
  * Fetches users from backend
  * Displays user profiles in card format
  * also add global search in header
  * create new user option
  * edit the user
  * delete the user

---

## 📡 API Integration

All API calls are handled using axios.

### Example endpoints:

* `POST /register`
* `POST /login`
* `GET /api/profiles`
* `POST /api/profiles`
  see swagger for all endpoints

Authorization header is used for protected routes:

```bash
Authorization: Bearer <token>
```

---

## 🎨 UI Guidelines

* Only **shadcn components** are used
* No custom UI components created manually
* Clean and responsive layout


## 📬 Submission
The candidate are required to push the fronend code only inside the repository.
* GitHub Repository: `<your-repo-link>`
* Submitted via company email

---

## 🙌 Acknowledgement

This project was completed as part of a frontend technical assignment.

---
