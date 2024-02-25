import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../App'

function Home() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Add loading state
  const user = useContext(userContext)

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      axios
        .get('https://blogapp-server2-j4e0.onrender.com/post/getposts')
        .then((response) => {
          setPosts(response.data)
          setIsLoading(false) // Update loading state
        })
        .catch((err) => console.log(err))
    }, 1000)

    // Clear the timer on component unmount
    return () => clearTimeout(timer)
  }, [])

  // Render loading message while fetching data
  if (isLoading) {
    return <div className="loading-message">Loading...</div>
  }

  // Render "No posts found" message if there are no posts
  if (posts.length === 0) {
    return (
      <div className="no-posts-container">
        <h1>No posts found</h1>
        {user.username ? (
          <p>
            It seems there are no posts available right now. Why not{' '}
            <Link to="/createpost">create a new post</Link> and share your
            thoughts with the community?
          </p>
        ) : (
          <p>
            It seems there are no posts available right now. You can{' '}
            <Link to="/login">log in</Link> or{' '}
            <Link to="/register">sign up</Link> to start creating your own
            posts!
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="posts-container">
      <br />
      <h2 className="welcome-message">
        Welcome to the Blog App, {user.username ? user.username : 'Guest'}!
      </h2>

      <div className="grid-container">
        {posts.map((post, index) => {
          return (
            <Link to={`/post/${post._id}`} className="grid-item" key={post.id}>
              <img src={`http://localhost:3001/Images/${post.file}`} alt="" />
              <div className="post-text">
                <h2 className="grid-title">{post.title}</h2>
                <p>{post.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Home
