import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to Inventory Management</h1>
      <button onClick={() => navigate("/login")}>Get Started</button>
    </div>
  );
}

export default Landing;
