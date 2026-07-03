# Frontend Integration Guide

The backend is ready. The frontend should not call Firebase for auth or tasks.

Use this base URL:

```js
const API_BASE_URL = "http://localhost:5000/api";
```

---

## 1. Login

```js
async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}
```

---

## 2. Signup

```js
async function signup(name, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Signup failed");

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}
```

---

## 3. Protected API Helper

```js
async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");

  return data;
}
```

---

## 4. Tasks

```js
const tasksData = await apiRequest("/tasks");
const tasks = tasksData.tasks;
```

Create task:

```js
await apiRequest("/tasks", {
  method: "POST",
  body: JSON.stringify({
    title,
    description,
    dueDate,
    priority,
    completed: false,
  }),
});
```

Update task:

```js
await apiRequest(`/tasks/${id}`, {
  method: "PATCH",
  body: JSON.stringify({ completed: true }),
});
```

Delete task:

```js
await apiRequest(`/tasks/${id}`, {
  method: "DELETE",
});
```

---

## 5. AI Plan

```js
const data = await apiRequest("/ai-plan", {
  method: "POST",
  body: JSON.stringify({}),
});

const plan = data.plan;
```

---

## 6. Protected Route

```jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
}
```

---

## 7. Logout

```js
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/login");
```
