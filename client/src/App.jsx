import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import DraftPage from "./pages/Draft";

const Login = () => <HomePage />;

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => {
        console.log("User data fetched:", res.data);  
        setUser(res.data || null);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" replace />} />
        <Route path="/draft" element={user ? <DraftPage user={user} /> : <Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
};

export default App;
