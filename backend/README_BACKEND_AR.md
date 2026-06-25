# باك إند Smart Task Planner - نسخة جاهزة للتسليم

هذه نسخة Backend جاهزة لمشروع Smart Task Planner باستخدام:

- Node.js
- Express.js
- REST API
- Token Authentication
- JSON file database

هذه النسخة لا تعتمد على Firebase ولا تحتاج API خارجي للذكاء الاصطناعي.

---

## طريقة التشغيل

افتح Terminal داخل مجلد `backend` ثم نفذ:

```bash
npm install
npm run dev
```

أو:

```bash
npm start
```

الرابط الافتراضي:

```text
http://localhost:5000
```

لفحص حالة السيرفر:

```text
GET http://localhost:5000/api/health
```

---

## إعداد ملف البيئة

انسخ الملف:

```bash
cp .env.example .env
```

محتوى `.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-this-with-a-long-random-secret
```

---

## المسارات المتوفرة

### Auth

```text
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### Tasks

كل مسارات المهام تحتاج Token:

```text
Authorization: Bearer TOKEN_HERE
```

```text
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/stats
GET    /api/tasks/:id
PATCH  /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### AI Plan

```text
POST /api/ai-plan
```

يعطي خطة يومية ذكية بناءً على المهام الموجودة بدون الحاجة إلى Anthropic أو OpenAI API.

---

## ملاحظات مهمة للجروب

الفرونت لازم يستخدم هذه الـ API بدل Firebase.

بعد تسجيل الدخول أو إنشاء حساب، خزّن التوكن:

```js
localStorage.setItem("token", data.token);
```

ثم أرسله مع طلبات المهام:

```js
Authorization: `Bearer ${localStorage.getItem("token")}`
```

---

## فحص الأخطاء

```bash
npm run check
```

---

## إعادة ضبط قاعدة البيانات

```bash
npm run reset-db
```
