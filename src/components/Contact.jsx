import React, { useState } from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [alertOpen, setAlertOpen] = useState(false)
  const [resMessage, setResMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(
          'https://blogapp-server2-j4e0.onrender.com/mail/contact',
          formData
        )
        .then((res) => setResMessage(res.data.message))
        .catch((err) => console.log(err))
      setAlertOpen(true)
      setTimeout(() => {
        // Hide alert and navigate after 3 seconds
        setAlertOpen(false)
      }, 3000)
      setFormData({
        name: '',
        email: '',
        message: '',
      })
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again later.')
    }
  }

  return (
    <div className="contact-container">
      {alertOpen && (
        <Alert
          className="custom-alert"
          severity="success"
          onClose={() => setAlertOpen(false)}
        >
          {resMessage}
        </Alert>
      )}
      <h1>Contact Us</h1>
      <p>
        If you have any questions or inquiries, feel free to reach out to us
        using the form below:
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>

      <br />

      <span className="copyright">
        &copy; {new Date().getFullYear()} iBelieve. All rights reserved.
      </span>
    </div>
  )
}

export default Contact
