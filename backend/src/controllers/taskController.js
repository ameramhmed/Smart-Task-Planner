const { readDb, writeDb, createId } = require("../utils/fileDb");

const allowedPriorities = ["Low", "Medium", "High"];

function parseBoolean(value, fallback = false) {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}

function cleanPriority(priority, fallback = "Medium") {
  return allowedPriorities.includes(priority) ? priority : fallback;
}

function cleanDate(value) {
  return String(value || "").trim();
}

function listTasks(req, res) {
  const db = readDb();
  const tasks = db.tasks
    .filter((task) => task.userId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.json({
    success: true,
    count: tasks.length,
    tasks,
  });
}

function createTask(req, res) {
  const title = String(req.body.title || "").trim();
  const description = String(req.body.description || "").trim();
  const dueDate = cleanDate(req.body.dueDate);
  const priority = cleanPriority(req.body.priority);
  const completed = parseBoolean(req.body.completed, false);

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Task title is required.",
    });
  }

  const db = readDb();
  const now = new Date().toISOString();
  const task = {
    id: createId("tsk"),
    userId: req.user.id,
    title,
    description,
    dueDate,
    priority,
    completed,
    createdAt: now,
    updatedAt: now,
  };

  db.tasks.push(task);
  writeDb(db);

  return res.status(201).json({
    success: true,
    message: "Task created successfully.",
    task,
  });
}

function getTask(req, res) {
  const db = readDb();
  const task = db.tasks.find(
    (item) => item.id === req.params.id && item.userId === req.user.id
  );

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found.",
    });
  }

  return res.json({
    success: true,
    task,
  });
}

function updateTask(req, res) {
  const db = readDb();
  const index = db.tasks.findIndex(
    (item) => item.id === req.params.id && item.userId === req.user.id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found.",
    });
  }

  const existing = db.tasks[index];
  const updates = {};

  if (Object.prototype.hasOwnProperty.call(req.body, "title")) {
    updates.title = String(req.body.title || "").trim();
    if (!updates.title) {
      return res.status(400).json({
        success: false,
        message: "Task title cannot be empty.",
      });
    }
  }

  if (Object.prototype.hasOwnProperty.call(req.body, "description")) {
    updates.description = String(req.body.description || "").trim();
  }

  if (Object.prototype.hasOwnProperty.call(req.body, "dueDate")) {
    updates.dueDate = cleanDate(req.body.dueDate);
  }

  if (Object.prototype.hasOwnProperty.call(req.body, "priority")) {
    updates.priority = cleanPriority(req.body.priority, existing.priority);
  }

  if (Object.prototype.hasOwnProperty.call(req.body, "completed")) {
    updates.completed = parseBoolean(req.body.completed, existing.completed);
  }

  db.tasks[index] = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeDb(db);

  return res.json({
    success: true,
    message: "Task updated successfully.",
    task: db.tasks[index],
  });
}

function deleteTask(req, res) {
  const db = readDb();
  const index = db.tasks.findIndex(
    (item) => item.id === req.params.id && item.userId === req.user.id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found.",
    });
  }

  db.tasks.splice(index, 1);
  writeDb(db);

  return res.json({
    success: true,
    message: "Task deleted successfully.",
  });
}

function taskStats(req, res) {
  const db = readDb();
  const tasks = db.tasks.filter((task) => task.userId === req.user.id);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
    highPriority: tasks.filter((task) => task.priority === "High").length,
    mediumPriority: tasks.filter((task) => task.priority === "Medium").length,
    lowPriority: tasks.filter((task) => task.priority === "Low").length,
  };

  return res.json({
    success: true,
    stats,
  });
}

module.exports = {
  listTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  taskStats,
};
