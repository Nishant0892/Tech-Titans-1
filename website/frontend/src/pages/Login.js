import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Login.css";
import API from "./../api/axios";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/admin/login", user);
      if (response.data.token) {
        alert("Login Successful ✅");
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
        <a href="/register">Register here</a>
      </form>
    </div>
  );
}

export default Login;
