import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="splash-logo">✦</div>
        <h1 className="splash-title">Smart Task Planner</h1>
        <p className="splash-subtitle">AI-Powered Productivity</p>
        <div className="splash-loader">
          <div className="splash-dot"></div>
          <div className="splash-dot"></div>
          <div className="splash-dot"></div>
        </div>
      </div>
    </div>
  );
}