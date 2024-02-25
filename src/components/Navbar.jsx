import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import axios from 'axios'

function Navbar() {
  const user = useContext(userContext)

  const navigate = useNavigate()

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#fff',
  }

  function handleLogout() {
    axios
      .get('https://blogapp-server2-j4e0.onrender.com/auth/logout')
      .then((res) => {
        if (res.data.logout) {
          navigate(0)
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="navbar-header">
      <div className="brand">
        <h3>Blog App</h3>
      </div>
      <div>
        <NavLink
          to="/"
          className="link"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Home
        </NavLink>
        {user.username && (
          <NavLink
            to="/createpost"
            className="link"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Create
          </NavLink>
        )}

        <NavLink
          to="/contact"
          className="link"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Contact
        </NavLink>
      </div>
      {user.username ? (
        <div>
          <input
            type="button"
            onClick={handleLogout}
            value="Logout"
            className="logout_btn"
          />
        </div>
      ) : (
        <div>
          <h5>
            <NavLink
              to="/register"
              className="link"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Register/Login
            </NavLink>
          </h5>
        </div>
      )}
    </div>
  )
}

export default Navbar
