# Task-Management-REST-APP-with-RealTime-Updates
Task Manager is a professional full-stack dashboard featuring a "Linear-style" UI. Built with React, Node.js, and PostgreSQL, it offers real-time stat updates via Socket.io, priority tracking, and a seamless Dark/Light mode. Experience high-end productivity with colorful status indicators and a fully responsive, data-driven design.
# 📝 TaskManager | Real-Time Task Management System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)
![Socket.io](https://img.shields.io/badge/realtime-Socket.io-orange)

TaskManager is a modern, full-stack Task Management application built to handle your daily workflow with real-time updates. Using WebSockets, the application ensures that any change made to a task is instantly reflected across all connected users without refreshing the page.

---

## 🚀 Key Features

* **Real-Time Synchronization**: Instant UI updates across all tabs/users using **Socket.io**.
* **Full CRUD Functionality**: Create, Read, Update, and Delete tasks seamlessly.
* **Smart Filtering**: Filter tasks by status (To Do, In Progress, Completed).
* **Priority System**: Assign High, Medium, or Low priority to stay focused.
* **Modern UI**: A clean, responsive interface built with **React** and **Tailwind CSS**.
* **Secure Backend**: Environment variables protected by `dotenv` and a structured PostgreSQL schema.

---

## 🛠️ Tech Stack

### Frontend
* **React.js** (Vite)
* **Tailwind CSS** (Styling)
* **Lucide React** (Icons)
* **Socket.io-client** (Real-time events)

### Backend
* **Node.js & Express**
* **PostgreSQL** (Database)
* **node-postgres (pg)** (Database Driver)
* **Socket.io** (Server-side WebSockets)

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16+)
* [PostgreSQL](https://www.postgresql.org/)
* [Git](https://git-scm.com/)

---




## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/shaheen042/Task-Management-REST-APP-with-RealTime-Updates.git](https://github.com/shaheen042/Task-Management-REST-APP-with-RealTime-Updates.git)
cd Task-Management-REST-APP-with-RealTime-Updates


2. Database Setup :

Open pgAdmin 4 or your PostgreSQL terminal.
Create a new database named taskflow_db.
Execute the following SQL script to create the required table:

SQL

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'To Do',
    priority VARCHAR(50) DEFAULT 'Medium',
    duedate DATE,
    createdat TIMESTAMP DEFAULT NOW(),
    updatedat TIMESTAMP DEFAULT NOW()
);


3. Backend Configuration
Navigate to the server folder:

Bash
cd server

Install dependencies:
    Bash
         > npm install
         > Create a .env file in the server folder:

Code snippet

PORT=5000
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskflow_db
Start the backend server:

Bash
npm start


4. Frontend Configuration
Open a new terminal window and navigate to the frontend folder:

Bash
cd frontend

Install dependencies:
   Bash
     >npm install
     >Start the React development server:

Bash
npm run dev


📂 Project Structure
Plaintext

├── frontend/             # React application (Vite)
│   ├── src/
│   │   ├── components/   # Functional UI Components
│   │   └── App.jsx       # Main application logic & Socket connection
├── server/               # Node.js / Express API
│   ├── .env              # Environment variables (Ignored by Git)
│   └── index.js          # Server entry point & API routes
└── .gitignore            # Root gitignore to protect sensitive files
🛡️ Security Note
The .env file containing database credentials is automatically ignored by Git. When deploying or sharing, ensure you provide your own environment variables as shown in the configuration section.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

Developed by Shaheen042
