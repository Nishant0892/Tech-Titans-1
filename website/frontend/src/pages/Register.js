import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Register.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (user.username === "" || user.password === "") {
      alert("Please Fill All Fields ❌");
    } else {
      await axios.post("http://localhost:5000/api/register", user);
      alert("Registration Successful ✅");
      navigate("/login");
    }
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Admin Registration</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login Here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
