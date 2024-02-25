import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from '@mui/material/Alert'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [alertOpen, setAlertOpen] = useState(false)
  const [resMessage, setResMessage] = useState('')

  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()
    axios
      .post('https://blogapp-server2-j4e0.onrender.com/auth/register', {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res)
        if (res.status === 201 && res.data.register) {
          setResMessage(res.data.message)
          setAlertOpen(true)
          setTimeout(() => {
            // Hide alert and navigate after 3 seconds
            setAlertOpen(false)
            navigate('/login')
          }, 3000)
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message)
        } else {
          setErrorMessage('An error occurred while processing your request')
        }
      })
  }

  return (
    <div className="signup_container">
      <div className="signup_form">
        {alertOpen && (
          <Alert
            className="custom-alert"
            severity="success"
            onClose={() => setAlertOpen(false)}
          >
            {resMessage}
          </Alert>
        )}
        <h2>Sign Up</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Username:</label> <br />
            <input
              type="text"
              placeholder="Enter username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              placeholder="Enter Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              placeholder="********"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="signup_btn" type="submit">
            Sign up
          </button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <br />
        <p>Already have an account?</p>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Register
