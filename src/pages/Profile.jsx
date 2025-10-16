import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

useEffect(() => {
  async function fetchProfile() {
    try {
      const res = await api.get("/profile"); // <--- Connects to /api/profile, with Bearer token
      setUser(res.data);
    } catch {
      navigate("/login");
    }
  }
  fetchProfile();
}, [navigate]);