import  { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import axiosInstance from "./utils/axiosInstance";
import Home from "./pages/Home/Home";
import Admin from "./pages/Home/Admin";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Index from "./pages/Index/index";
import Loader from "./components/Ui/Loader";// Import the loader

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Fetch user details to check if the user is admin or not
          const response = await axiosInstance.get("/get-user");
          if (response.status === 200) {
            setIsAuthenticated(true);
        // Check if the user is admin
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <Loader />; // Show loader while fetching user data
  }

  return (
    <Router>
      <Routes>
        {/* If authenticated, show Admin or Home based on the user role, else show Index */}
        <Route path="/" element={isAuthenticated ?  <Home />: <Index />} />
        <Route path="/admin" element={isAuthenticated ? <Admin/> : <Index/>} />
        {/* Auth routes */}
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
