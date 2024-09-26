
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";

import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Index from "./pages/Index/index";
import Admin from "./pages/Home/Admin";

const App = () => {
 
  const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Returns true if token exists
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Home/> : <Index/>} />
        <Route path="/admin" element={ <Admin/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={ <SignUp/>} />
      </Routes>
    </Router>
  );
};

export default App;
