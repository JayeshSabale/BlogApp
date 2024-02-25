import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Alert from '@mui/material/Alert'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [alertOpen, setAlertOpen] = useState(false)
  const [resMessage, setResMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .post('https://blogapp-server2-j4e0.onrender.com/auth/login', {
        email,
        password,
      })
      .then((res) => {
        setResMessage(res.data.message)
        if (res.status === 200 && res.data.login) {
          setAlertOpen(true)
          setTimeout(() => {
            // Hide alert and navigate after 3 seconds
            setAlertOpen(false)
            window.location.href = '/'
          }, 3000)
        }
      })
      .catch((err) => {
        console.log(err)
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
        <h2>Login</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              placeholder="Enter Email"
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="signup_btn">Login</button>
        </form>
        <br></br>
        <p>Not Registered?</p>
        <Link to="/register">
          <button className="login-btn">Signup</button>
        </Link>
      </div>
    </div>
  )
}

export default Login
