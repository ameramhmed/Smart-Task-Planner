# Smart Task Planner Backend

Submit-ready backend API for the Smart Task Planner project.

The backend is built with **Node.js + Express.js** and provides:

- User signup
- User login
- Token-based authentication
- Protected user profile endpoint
- Tasks CRUD
- Task statistics
- Local smart daily plan generator
- JSON-file local storage for simple academic/project submission

No Firebase is used in this backend.
No external AI API key is required.

---

## 1. Requirements

Install Node.js first.
Recommended version: Node.js 18 or newer.

---

## 2. Installation

Open terminal inside the backend folder:

```bash
cd backend
npm install
```

---

## 3. Environment Setup

Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Example `.env` content:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-this-with-a-long-random-secret
```

Important:

- `PORT` is the backend port.
- `CLIENT_URL` is the frontend URL.
- `JWT_SECRET` is used for signing authentication tokens.

---

## 4. Run the Server

Development mode:

```bash
npm run dev
```

Production/simple mode:

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

---

## 5. API Endpoints

### Auth

| Method | Endpoint | Protected | Description |
|---|---|---:|---|
| POST | `/api/auth/signup` | No | Create a new account |
| POST | `/api/auth/login` | No | Login and receive token |
| GET | `/api/auth/me` | Yes | Get current logged-in user |

### Tasks

All task endpoints require this header:

```text
Authorization: Bearer YOUR_TOKEN
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks for logged-in user |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/stats` | Get task statistics |
| GET | `/api/tasks/:id` | Get one task |
| PATCH | `/api/tasks/:id` | Update a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### AI Plan

| Method | Endpoint | Protected | Description |
|---|---|---:|---|
| POST | `/api/ai-plan` | Yes | Generate optimized daily plan from current tasks |

---

## 6. Request Examples

### Signup

```http
POST /api/auth/signup
Content-Type: application/json
```

```json
{
  "name": "Ameer Ali",
  "email": "ameer@example.com",
  "password": "123456"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "ameer@example.com",
  "password": "123456"
}
```

### Create Task

```http
POST /api/tasks
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

```json
{
  "title": "Finish project backend",
  "description": "Complete API routes and documentation",
  "dueDate": "2026-06-30",
  "priority": "High",
  "completed": false
}
```

### Update Task Completion

```http
PATCH /api/tasks/TASK_ID
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

```json
{
  "completed": true
}
```

### Generate AI Plan

```http
POST /api/ai-plan
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

```json
{}
```

---

## 7. Data Storage

This project uses a local JSON file as a simple database:

```text
data/db.json
```

This is suitable for a small academic project/demo.

To reset the local database:

```bash
npm run reset-db
```

---

## 8. Check Syntax

Run:

```bash
npm run check
```

This checks the main JavaScript files for syntax errors.

---

## 9. Frontend Connection Notes

The frontend should call:

```js
const API_BASE_URL = "http://localhost:5000/api";
```

After login/signup, save the returned token in localStorage:

```js
localStorage.setItem("token", data.token);
```

For protected requests:

```js
headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
}
```

---

## 10. Project Structure

```text
backend/
  data/
    db.json
  docs/
    API_TESTING_GUIDE.md
    FRONTEND_INTEGRATION_GUIDE.md
  src/
    controllers/
    middleware/
    routes/
    utils/
  .env.example
  package.json
  README.md
  server.js
```
