import "./Dashboard.css";

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

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
        <p>You have 3 tasks requiring your attention today.</p>
      </div>

      {/* AI Insights */}
      <div className="ai-card">
        <div className="ai-title">✦ AI Insights</div>
        <p>Based on your schedule, you have a 2-hour deep work window at 1:00 PM. Suggest prioritizing the Q3 Financial Report.</p>
        <button className="ai-btn">Schedule Now</button>
      </div>

      {/* Today's Tasks */}
      <div className="tasks-section">
        <div className="tasks-header">
          <h2>Today's Tasks</h2>
          <span>•••</span>
        </div>
        <div className="task-item">
          <input type="checkbox" />
          <div className="task-info">
            <p className="task-title">Finalize Q3 Report</p>
            <p className="task-time">Due 12:00 PM</p>
          </div>
          <span>›</span>
        </div>
        <div className="task-item">
          <input type="checkbox" />
          <div className="task-info">
            <p className="task-title">Client Alignment Call</p>
            <p className="task-time">2:30 PM - 3:00 PM</p>
          </div>
          <span>›</span>
        </div>
        <div className="task-item">
          <input type="checkbox" />
          <div className="task-info">
            <p className="task-title">Review Design Assets</p>
            <p className="task-time">Flexible</p>
          </div>
          <span>›</span>
        </div>
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