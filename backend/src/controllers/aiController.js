const { readDb } = require("../utils/fileDb");

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function durationForPriority(priority) {
  if (priority === "High") return 120;
  if (priority === "Medium") return 75;
  return 45;
}

function priorityRank(priority) {
  const score = { High: 3, Medium: 2, Low: 1 };
  return score[priority] || 0;
}

function tagsForTask(task) {
  const tags = [];

  if (task.priority === "High") tags.push("High Focus");
  if (task.priority === "Medium") tags.push("Balanced");
  if (task.priority === "Low") tags.push("Quick Win");
  if (task.dueDate) tags.push("Due Date");

  return tags;
}

function generatePlan(req, res) {
  const db = readDb();
  const tasks = db.tasks
    .filter((task) => task.userId === req.user.id && !task.completed)
    .sort((a, b) => {
      const byPriority = priorityRank(b.priority) - priorityRank(a.priority);
      if (byPriority !== 0) return byPriority;
      if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  if (tasks.length === 0) {
    return res.json({
      success: true,
      source: "local-smart-scheduler",
      plan: [
        {
          time: "09:00 AM",
          title: "Plan your top 3 tasks",
          duration: "30 min",
          tags: ["Planning"],
          aiOptimized: true,
        },
        {
          time: "09:45 AM",
          title: "Deep work session",
          duration: "120 min block",
          tags: ["High Focus"],
          aiOptimized: true,
        },
        {
          time: "01:00 PM",
          title: "Review and organize tomorrow",
          duration: "45 min",
          tags: ["Review"],
          aiOptimized: false,
        },
      ],
    });
  }

  let cursor = new Date();
  cursor.setHours(9, 0, 0, 0);

  const plan = tasks.slice(0, 6).map((task, index) => {
    const durationMinutes = durationForPriority(task.priority);
    const item = {
      time: formatTime(cursor),
      title: task.title,
      duration:
        durationMinutes >= 90
          ? `${durationMinutes} min block`
          : `${durationMinutes} min`,
      tags: tagsForTask(task),
      aiOptimized: task.priority !== "Low" || index === 0,
    };

    cursor = addMinutes(cursor, durationMinutes + 15);
    return item;
  });

  return res.json({
    success: true,
    source: "local-smart-scheduler",
    plan,
  });
}

module.exports = {
  generatePlan,
};
