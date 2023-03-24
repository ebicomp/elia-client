import React, { useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [formValid, setFormValid] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    const login = {
      email,
      password
    }

    Axios.post("/Auth/login", login)
      .then(response => {
        sessionStorage.setItem("token", response.data.token)
        sessionStorage.setItem("email", response.data.email)
        setFormValid(true)
        navigate("/")
      })
      .catch(e => {
        console.log(e.response)
        setFormValid(false)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="form2Example1" className="form-control" />
        <label className="form-label" htmlFor="form2Example1">
          Email address
        </label>
      </div>

      <div className="form-outline mb-4">
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="form2Example2" className="form-control" />
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Log In
      </button>
      {!formValid && <div className="alert alert-danger">Username or Password is not correct, please try again</div>}
    </form>
  )
}

export default Login
