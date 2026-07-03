# API Testing Guide

Base URL:

```text
http://localhost:5000/api
```

## 1. Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "status": "ok",
  "timestamp": "..."
}
```

---

## 2. Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'
```

Copy the token from the response.

---

## 3. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

---

## 4. Get Current User

Replace `TOKEN_HERE` with the token.

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## 5. Create Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_HERE" \
  -d '{"title":"Study backend","description":"Review API endpoints","dueDate":"2026-06-30","priority":"High","completed":false}'
```

---

## 6. List Tasks

```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## 7. Update Task

```bash
curl -X PATCH http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_HERE" \
  -d '{"completed":true}'
```

---

## 8. Delete Task

```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## 9. Generate Daily Plan

```bash
curl -X POST http://localhost:5000/api/ai-plan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_HERE" \
  -d '{}'
```
