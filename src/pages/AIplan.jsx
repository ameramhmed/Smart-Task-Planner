import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./AIplan.css";
import { generateRecommendations } from "../services/recommendation"; 

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

    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);

    const tasks = snapshot.docs.map((doc) => doc.data());

    const result = await generateRecommendations(tasks);

    setPlan(result);
  } catch (err) {
    console.error(err);

    setPlan([
  {
    title: "Start with your highest priority task",
    reason: "This helps you finish the most important work first.",
    action: "Choose the task with the closest deadline and work on it before anything else.",
    priority: "High",
  },
]);
  }

  setLoading(false);
};

  return (
    <div className="aiplan-page">
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

      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate("/dashboard")}>Tasks</div>
        <div className="nav-item" onClick={() => navigate("/tasks")}>All</div>
        <div className="nav-item" onClick={() => navigate("/tasks")}>Insights</div>
        <div className="nav-item active">AI</div>
      </div>
    </div>
  );
}