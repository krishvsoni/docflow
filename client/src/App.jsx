import React, { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import DraftPage from "./pages/Draft";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home"); 

  useEffect(() => {
    axios.get("https://docflow-bncjgqaya5gtfwb0.eastasia-01.azurewebsites.net/auth/user", 
      { withCredentials: true })
      .then((res) => {
        setUser(res.data || null);
        if (res.data) {
          setCurrentView("dashboard"); 
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const navigate = (view) => {
    setCurrentView(view);
    window.history.pushState({}, "", `/${view === 'home' ? '' : view}`);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1);
      setCurrentView(path || 'home');
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return user ? <Dashboard user={user} navigate={navigate} /> : navigate("home");
      case "draft":
        return user ? <DraftPage user={user} navigate={navigate} /> : navigate("home");
      case "home":
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div>
      {renderView()}
    </div>
  );
};

export default App;