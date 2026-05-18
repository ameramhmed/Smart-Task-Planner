import { useEffect } from "react";
import "./Splash.css";

export default function Splash() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="splash-icon">🕐</div>
        <h1 className="splash-title">Visionary</h1>
        <p className="splash-subtitle">Smart Task Planner</p>
        <div className="splash-line"></div>
      </div>
    </div>
  );
}