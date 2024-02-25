import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { userContext } from '../App'

function Post() {
  const [post, setPost] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  const user = useContext(userContext)

  useEffect(() => {
    axios
      .get('https://blogapp-server2-j4e0.onrender.com/post/getpostbyid/' + id)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err))
  }, [])

  function handleDelete(id) {
    axios
      .delete('https://blogapp-server2-j4e0.onrender.com/post/deletepost/' + id)
      .then((res) => {
        if (res.data === 'postDeleted') {
          navigate('/')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="post_container">
      <div className="post_post">
        <img
          src={`https://blogapp-server2-j4e0.onrender.com/Images/${post.file}`}
          alt={`Image of ${post.title}`}
        />
        <h2 className="post_title">{post.title}</h2>
        <p>{post.description}</p>
        <div className="post_edit_delete">
          {user.email === post.email && (
            <>
              <Link to={`/editpost/${post._id}`} className="edit_button">
                Edit
              </Link>
              <Link
                className="delete_button"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
