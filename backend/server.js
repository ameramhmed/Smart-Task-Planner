const express = require("express");
const cors = require("cors");
const loadEnv = require("./src/utils/env");

loadEnv();

const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const aiRoutes = require("./src/routes/aiRoutes");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

function buildCorsOptions() {
  const clientUrl = process.env.CLIENT_URL;

  if (!clientUrl || clientUrl === "*") {
    return { origin: true, credentials: true };
  }

  const allowedOrigins = clientUrl
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  };
}

app.use(cors(buildCorsOptions()));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Task Planner API is running",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      tasks: "/api/tasks",
      aiPlan: "/api/ai-plan",
    },
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai-plan", aiRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Smart Task Planner API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
