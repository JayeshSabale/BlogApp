import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  const { id } = useParams()
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()

    axios
      .put('http://localhost:3001/post/editpost/' + id, { title, description })
      .then((res) => {
        if (res.data === 'postUpdated') {
          navigate('/')
        }
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    axios
      .get('https://blogapp-server2-j4e0.onrender.com/post/getpostbyid/' + id)
      .then((res) => {
        setTitle(res.data.title)
        setDescription(res.data.description)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <div className="post_form">
        <form onSubmit={handleSubmit}>
          <h2>Update Post</h2>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost
