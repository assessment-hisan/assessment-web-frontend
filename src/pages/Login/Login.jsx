import Navbar from "../../components/Navbar"
import PasswordInput from "../../components/Input/PasswordInput"
import { validateEmail } from "../../utils/helper"
import { useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { useNavigate } from "react-router-dom"

const Login =  () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if(!password) {
      setError("please enter the password")
      return;
    }

    setError("")
    
    //login api call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password:password
      })

      //Handle seccesfull login response
      if (response.data) {
          localStorage.setItem("token", response.data.accessToken)
          if (!response.data.isAdmin) {
            navigate("/dashboard")
          }else {
            navigate("/admin-dashboard")
          }
      }
    } catch (error) {
     
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      }else {
        setError("An unexpected error occured. Please try again")
      }
    }

  }
  
  return (
    <>
    <Navbar/>

    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>
          <input type="text"
                 placeholder="Email" 
                 className="input-box"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)} />

          <PasswordInput 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
