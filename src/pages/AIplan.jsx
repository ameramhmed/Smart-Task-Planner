import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./AIplan.css";

export default function AIplan() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    generatePlan();
  }, []);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      // جيبي المهام من Firebase
      const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      const tasks = snapshot.docs.map((doc) => doc.data());

      // أرسليهم للـ AI
      const taskList = tasks.map((t) => `- ${t.title} (${t.priority} priority, due: ${t.dueDate || "flexible"})`).join("\n");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a productivity AI. Based on these tasks, create an optimized daily schedule. Return ONLY a JSON array like this format, no extra text:
[
  {"time": "09:00 AM", "title": "Task name", "duration": "120 min block", "tags": ["High Focus"], "aiOptimized": true},
  {"time": "11:15 AM", "title": "Task name", "duration": "45 min", "tags": ["Team"], "aiOptimized": false}
]

Tasks:
${taskList || "No tasks yet, suggest a general productive schedule"}`
          }]
        })
      });

      const data = await response.json();
      const text = data.content[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setPlan(parsed);
    } catch (err) {
      console.error(err);
      setPlan([
        { time: "09:00 AM", title: "Deep Work Session", duration: "120 min block", tags: ["High Focus", "Strategic"], aiOptimized: true },
        { time: "11:15 AM", title: "Team Sync & Blockers", duration: "45 min", tags: ["Team"], aiOptimized: false },
        { time: "01:00 PM", title: "Creative Review", duration: "90 min block", tags: ["Creative", "Medium Energy"], aiOptimized: true },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="aiplan-page">
      {/* Header */}
      <div className="aiplan-header">
        <div className="dash-avatar">👤</div>
        <span className="aiplan-name">Visionary</span>
        <span>📅</span>
      </div>

      <div className="ai-generated-badge">✦ AI GENERATED</div>
      <h1 className="aiplan-title">Your Optimized Plan</h1>
      <p className="aiplan-subtitle">We've structured your day for maximum flow and cognitive ease. Focus on the execution; the intelligence has handled the coordination.</p>

      {loading ? (
        <div className="aiplan-loading">
          <div className="spinner"></div>
          <p>AI is optimizing your day...</p>
        </div>
      ) : (
        <div className="timeline">
          {plan?.map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-dot" style={{ background: item.aiOptimized ? "#3d5a99" : "#888" }}></div>
              <div className="timeline-card">
                <h3>{item.title}</h3>
                <p className="duration">⏱ {item.duration}</p>
                {item.aiOptimized && <span className="ai-badge">✦ AI Optimized</span>}
                <div className="tags">
                  {item.tags?.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate("/dashboard")}>✅ Tasks</div>
        <div className="nav-item" onClick={() => navigate("/tasks")}>📋 All</div>
        <div className="nav-item">📊 Insights</div>
        <div className="nav-item active">🤖 AI</div>
      </div>
    </div>
  );
}