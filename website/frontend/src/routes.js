import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Surveillance from "./pages/Surveillance";
import Staff from "./pages/Staff";
import Navbar from "./components/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="./pages/" element={<Landing />} />
        <Route path="./pages/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/inventory" element={<><Navbar /><Inventory /></>} />
        <Route path="/surveillance" element={<><Navbar /><Surveillance /></>} />
        <Route path="/staff" element={<><Navbar /><Staff /></>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
