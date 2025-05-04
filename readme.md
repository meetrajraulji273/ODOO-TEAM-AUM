# 🏅 Sporta – Sports Management System

**Sporta** is a full-featured, MERN-stack based Sports Management System. It helps manage members, staff, and administrative tasks efficiently through a secure dashboard. The system includes user authentication, member organization, and settings control — all powered by modern web technologies.

---

## 🚀 Features

- 🔐 **Authentication**
  - Secure Signup & Login using **JWT (JSON Web Token)**
  - Logout functionality
  - Protected routes for authorized access

- 📊 **Dashboard Management**
  - Admin panel with an intuitive and responsive UI
  - Overview of members and staff activity

- 👥 **Member Management**
  - Add, edit, delete members
  - Assign roles and responsibilities

- 🧑‍💼 **Staff & Settings**
  - Organize and manage staff information
  - Control system settings and configurations

- 🗂️ **Clean Codebase**
  - Organized folder structure for maintainability
  - Separation of concerns for backend and frontend logic

---

## 🛠️ Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Frontend  | React.js, Axios, React Router |
| Backend   | Node.js, Express.js       |
| Auth      | JSON Web Token (JWT)      |
| Database  | MongoDB (via Mongoose)    |

---
```bash
git clone https://github.com/your-username/sporta.git
cd sporta
2. Backend Setup
bash
Copy
Edit
cd server
npm install
# Create a .env file and configure the following:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
npm start
3. Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start