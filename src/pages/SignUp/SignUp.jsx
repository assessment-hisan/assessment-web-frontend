import Navbar from "../../components/Navbar"
import PasswordInput from "../../components/Input/PasswordInput"
import { useState } from "react"
import { validateEmail } from "../../utils/helper"

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!name) {
      setError("Please enter the name")
      return 
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if(!password) {
      setError("please enter the password")
      return;
    }

    setError("")
    
  }
  return (
    <>
    <Navbar/>

    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>

          <input type="text"
                 placeholder=" Name" 
                 className="input-box"
                 value={name}
                 onChange={(e) => setName(e.target.value)} />

          <input type="text"
                 placeholder="Email" 
                 className="input-box"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)} />

          <PasswordInput 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1 text-center">{error}</p>}

          <button type="submit" className="btn-primary">
            Create Account
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default SignUp
