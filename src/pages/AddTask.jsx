import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        dueDate,
        priority,
        completed: false,
        uid: auth.currentUser?.uid,
        createdAt: Timestamp.now(),
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="addtask-overlay">
      <div className="addtask-card">
        <div className="addtask-header">
          <h2>Create Task</h2>
          <span onClick={() => navigate("/dashboard")}>✕</span>
        </div>

        <label>Task Title</label>
        <input
          type="text"
          placeholder="e.g., Finalize Q3 Report"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Add details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label>Priority</label>
        <div className="priority-group">
          {["Low", "Medium", "High"].map((p) => (
            <button
              key={p}
              className={`priority-btn ${priority === p ? "active" : ""}`}
              onClick={() => setPriority(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="ai-insight">
          <p className="ai-insight-title">🤖 AI Insight</p>
          <p>Based on your past tasks, this is likely a <strong>{priority} Complexity</strong> task taking roughly 2.5 hours.</p>
        </div>

        <div className="addtask-actions">
          <button className="cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "💾 Save Task"}
          </button>
        </div>
      </div>
    </div>
  );
}