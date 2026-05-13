import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(
      collection(db, "tasks"),
      where("uid", "==", user.uid)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dash-header">
        <div className="dash-avatar">👤</div>
        <span className="dash-name">Visionary</span>
        <span className="dash-calendar-icon">📅</span>
      </div>

      {/* Greeting */}
      <div className="dash-greeting">
        <h1>{greeting}.</h1>
        <p>You have {tasks.length} tasks requiring your attention today.</p>
      </div>

      {/* AI Insights */}
      <div className="ai-card">
        <div className="ai-title">✦ AI Insights</div>
        <p>Based on your schedule, you have a 2-hour deep work window at 1:00 PM. Suggest prioritizing your top task.</p>
        <button className="ai-btn">Schedule Now</button>
      </div>

      {/* Today's Tasks */}
      <div className="tasks-section">
        <div className="tasks-header">
          <h2>Today's Tasks</h2>
          <span onClick={() => navigate("/add-task")} style={{cursor:"pointer"}}>+ Add</span>
        </div>

        {tasks.length === 0 ? (
          <p style={{color:"#aaa", textAlign:"center", padding:"20px"}}>No tasks yet. Add your first task!</p>
        ) : (
          tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <input type="checkbox" defaultChecked={task.completed} />
              <div className="task-info">
                <p className="task-title">{task.title}</p>
                <p className="task-time">{task.dueDate || task.priority}</p>
              </div>
              <span>›</span>
            </div>
          ))
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="nav-item active">✅ Tasks</div>
        <div className="nav-item">📅 Calendar</div>
        <div className="nav-item">📊 Insights</div>
        <div className="nav-item">🤖 AI</div>
      </div>
    </div>
  );
}