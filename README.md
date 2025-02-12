# Task Management System

## 📌 Project Overview
The **Task Management System** is a web application built with **React.js (Ant Design, TypeScript)** for the frontend and **Express.js (Node.js, MongoDB)** for the backend. This system is designed to efficiently manage users and tasks with role-based access control. The application includes a **micro-frontend** architecture for task management.

## 🚀 Features
### **🔑 Authentication & Authorization**
- **Admin & User Roles**:
  - Admin: Full access to manage users and tasks.
  - User: Can only view and complete assigned tasks.
- **Login Methods**:
  - **Email & Password Login**
  - **OTP-based Login** (Admin generates OTP for new users)
- **Password Management**:
  - After OTP login, users must set their password.
  
### **👥 User Management (Admin)**
- **Create Users**: Admin can create new users and send OTP.
- **View Users**: List of all registered users.
- **Edit Users**: Update user details.
- **Delete Users**: Remove users from the system.
- **Google Maps Integration**: Pick user address via Google Maps.
- **Phone Number Validation**: Ensures correct phone format with country code.

### **📋 Task Management**
- **Admin:**
  - Create, Update, Delete, and Assign Tasks.
- **User:**
  - View assigned tasks and mark them as completed.
- **Micro-Frontend Implementation:**
  - The **Task Management Module** is developed as a separate micro frontend.

### **🛠 API Documentation**
- **Swagger UI available at:** `/docs`
- **Postman Collection provided for testing APIs**

---

## 🏗️ Project Setup
### **🔹 Prerequisites**
Ensure you have the following installed:
- **Node.js** (v14 or later)
- **MongoDB** (Running locally or cloud instance)
- **Git**
- **VS Code (or any preferred editor)**

### **🔹 Clone the Repository**
```sh
 git clone https://github.com/your-repo/task-management-system.git
 cd task-management-system
```

---

## 🖥️ Backend Setup (Express.js + MongoDB)
```sh
cd backend
npm install
```
### **🔹 Environment Variables**
Create a `.env` file inside `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```
### **🔹 Run the Backend Server**
```sh
npm start
```
**API Base URL:** `http://localhost:5000/api/v1`

---

## 🎨 Frontend Setup (React + TypeScript + Ant Design)
```sh
cd frontend
npm install
```
### **🔹 Run the Frontend**
```sh
npm start
```
**Frontend URL:** `http://localhost:3001`

---

## 🏗️ Micro Frontend Setup (Task Management Module)
```sh
cd task-management-module
npm install
```
### **🔹 Run the Micro Frontend**
```sh
npm start
```
**Micro Frontend URL:** `http://localhost:3002`

---

## 📖 API Documentation (Swagger & Postman)
### **🔹 Swagger UI**
- Available at: `http://localhost:5000/docs`

### **🔹 Postman Collection**
- Import the provided Postman collection file.
- Use the **Pre-configured APIs** to test the system.

---

## 🔥 Testing the Application
### **🔹 Login Credentials**
| Role | Email | Password |
|------|-----------------|------------|
| **Admin** | kumar@gmail.com | abc123 |
| **User** | anushan@gmail.com | ss135 |

### **🔹 Test Cases**
- **Admin Logs In** → Creates Users → Sends OTP.
- **User Logs In with OTP** → Updates Password → Logs In Again.
- **Admin Assigns Task** → User Completes Task.

---

## 📌 Folder Structure
```
/task-management-system
├── backend  # Node.js + Express API
│   ├── models  # Database Models
│   ├── routes  # API Routes
│   ├── controllers  # API Controllers
│   ├── services  # Business Logic
│   ├── middleware  # Authentication Middleware
│   ├── config  # Database & Environment Configs
│   ├── docs  # Swagger Documentation
│   ├── package.json  # Dependencies
│   ├── server.js  # Main Server Entry Point
│
├── frontend  # React + TypeScript + Ant Design
│   ├── src
│   │   ├── components  # UI Components
│   │   ├── pages  # Screens (Admin Dashboard, User Management, etc.)
│   │   ├── services  # API Calls
│   │   ├── AppRouter.tsx  # Routing Configuration
│   │   ├── App.tsx  # Main Application
│   ├── package.json
│
└── Task Management System.postman_collection  # Project Documentation
└── README.md  # Project Documentation
```

---

## ⚡️ Additional Notes
✔ **Developed using modern UI components with Ant Design.**
✔ **Role-based authentication with JWT & Middleware protection.**
✔ **Uses Module Federation to load Task Management separately.**
✔ **API testing made easy with Postman & Swagger UI.**
✔ **Fully Responsive UI for Admin and Users.**

---

## 🤝 Contributing
Feel free to submit **issues** or **pull requests** for improvements.

---

## 📝 License
This project is licensed under the **MIT License**.
