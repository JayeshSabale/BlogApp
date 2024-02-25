import React, { createContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import Contact from './components/COntact'
import Post from './components/Post'
import EditPost from './components/EditPost'

export const userContext = createContext()

function App() {
  const [user, setUser] = useState({})

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios
      .get('https://blogapp-server2-j4e0.onrender.com/auth/verify')
      .then((user) => setUser(user.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/editpost/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
