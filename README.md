Smart Task Planner 

A smart web application that helps users organize their daily tasks and prioritize them using AI.

Group Graduation Project - Isra University



 About the Project

Smart Task Planner is a web application that allows users to easily create and manage their daily tasks, featuring an AI capability that suggests an optimized daily plan based on task priorities and due dates.



 Team

| Name | Role |

| Amera Mohammed Alshafei | UX/UI Design & Frontend Development |
| Dina | Backend & Database Developer |
| Afnan | AI Specialist & Documentation |



 Tech Stack

- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js
- **Database & Auth:** Firebase (Authentication, Firestore)
- **AI Integration:** Groq API
- **Version Control:** Git & GitHub
- **Design:** Figma
- **Task Management:** Trello

---

## ✨ Key Features

- 🔐 Login and Sign Up (Firebase Authentication)
- 🏠 Main Dashboard displaying tasks in real time
- ➕ Add new tasks with priority and due date
- 📋 Task Management page (filter, complete, delete)
- 🤖 AI-powered optimized daily plan
- 🛡️ Protected Routes to prevent unauthorized access
- 🚪 Logout functionality
- ⚙️ Backend API built with Node.js/Express to support authentication and task operations

---

## 📁 Project Structure

```
smart-task-planner/
├── public/
├── src/
│   ├── pages/          # App pages (Login, Signup, Dashboard, ...)
│   ├── firebase.js     # Firebase configuration
│   ├── ProtectedRoute.jsx
│   ├── App.jsx
│   └── main.jsx
├── backend/             # Backend API code (Node.js + Express)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Run the Frontend
```bash
# Clone the repository
git clone https://github.com/ameramhmed/Smart-Task-Planner.git

# Navigate to the project folder
cd Smart-Task-Planner

# Install dependencies
npm install

# Run the project
npm run dev
```

### Run the Backend
See `backend/README.md` for full setup and running instructions.

---

## 🌿 Git Branches

- `main` — Stable main branch (contains all merged parts)
- `feature/frontend` — Frontend UI (Amera)
- `feature/ai` — AI feature (Afnan) — Merged ✅
- `feature/backend` — Backend API (Dina) — Merged ✅

---

## 📄 License

Academic project for educational purposes - Isra University 2026
