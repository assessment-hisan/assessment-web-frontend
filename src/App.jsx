import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axiosInstance from "./utils/axiosInstance"; // Import axios instance
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Index from "./pages/Index/index";
import Admin from "./pages/Home/Admin";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/verify-token"); // Example endpoint
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Authentication failed", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state while checking auth
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home/> : <Index />} />
        <Route path="/admin-dashboard" element={ <Admin />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={ <SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
