import React from "react";
import "./../styles/Home.css";

function Home() {
  const adminName = "Yash"; // Ye tere naam ke liye 😏🔥

  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome, {adminName}</h1>
        <p>This is your Inventory Management System Dashboard</p>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Inventory Items</h3>
            <p>50</p>
          </div>
          <div className="card">
            <h3>Total Staff</h3>
            <p>10</p>
          </div>
          <div className="card">
            <h3>Surveillance Status</h3>
            <p>Active ✅</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
