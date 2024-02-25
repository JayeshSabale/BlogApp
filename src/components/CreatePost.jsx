import axios from 'axios'
import React, { useContext, useState } from 'react'
import Alert from '@mui/material/Alert'
import { userContext } from '../App'

function CreatePost() {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [file, setFile] = useState()
  const [alertOpen, setAlertOpen] = useState(false)
  const [resMessage, setResMessage] = useState('')

  const user = useContext(userContext)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('email', user.email)
    formData.append('file', file)

    axios
      .post(
        'https://blogapp-server2-j4e0.onrender.com/post/createpost',
        formData
      )
      .then((res) => {
        if (res.data.postCreated) {
          setResMessage(res.data.message)
          setAlertOpen(true)
          setTimeout(() => {
            // Hide alert and navigate after 3 seconds
            setAlertOpen(false)
            window.location.href = '/'
          }, 3000)
        }
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="create-post-container">
      {alertOpen && (
        <Alert
          className="custom-alert"
          severity="success"
          onClose={() => setAlertOpen(false)}
        >
          {resMessage}
        </Alert>
      )}
      <div className="post_form">
        <form onSubmit={handleSubmit}>
          <h2>Create Post</h2>
          <input
            type="text"
            placeholder="Enter Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            placeholder="Enter Description"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            className="file"
            placeholder="Select File"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
