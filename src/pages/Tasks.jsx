import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "All") return true;
    return t.priority === filter;
  });

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const handleComplete = async (id, current) => {
    await updateDoc(doc(db, "tasks", id), { completed: !current });
  };

  const priorityColor = { High: "#ff4d4d", Medium: "#f0a500", Low: "#4caf50" };

  return (
    <div className="tasks-page">
      {/* Header */}
      <div className="tasks-header">
        <div className="dash-avatar">👤</div>
        <span className="tasks-title">Visionary</span>
        <span>📅</span>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {["All", "High", "Medium", "Low"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "All" ? "All Tasks" : `${f} Priority`}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="task-cards">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks found!</p>
        ) : (
          filteredTasks.map((task) => (
            <div className={`task-card ${task.completed ? "completed" : ""}`} key={task.id}>
              <div className="task-card-header">
                <span className="priority-badge" style={{ background: priorityColor[task.priority] || "#888" }}>
                  {task.priority || "Medium"} Priority
                </span>
                <span className="task-due">{task.dueDate || "No date"}</span>
                <button className="complete-btn" onClick={() => handleComplete(task.id, task.completed)}>
                  {task.completed ? "✅" : "⭕"}
                </button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>🗑️</button>
              </div>
              <h3 className={task.completed ? "line-through" : ""}>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Button */}
      <button className="fab" onClick={() => navigate("/add-task")}>+</button>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate("/dashboard")}>✅ Tasks</div>
        <div className="nav-item active">📋 All</div>
        <div className="nav-item">📊 Insights</div>
        <div className="nav-item">🤖 AI</div>
      </div>
    </div>
  );
}