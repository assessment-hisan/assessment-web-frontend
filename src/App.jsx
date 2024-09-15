import { BrowserRouter as Router , Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import Index from "./pages/Index/index"
import Admin from  "./pages/Home/Admin"
const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Index/>}/>
      <Route path="/admin-dashboard"  exact element={<Admin/>}/>
      <Route path="/dashboard"  exact element={<Home/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/signup" exact element={<SignUp/>}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
  <>{routes}
  </>
  )
}

export default App
