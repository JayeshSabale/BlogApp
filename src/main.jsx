import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// /* Media Query for Mobile Devices */
// @media only screen and (max-width: 768px) {
//   .signup_container {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     min-height: 90vh;
//     margin: 0 auto; /* Center the container horizontally */
//   }

//   .signup_form {
//     border: 1px solid gray;
//     padding: 20px;
//     border-radius: 10px;
//     width: 90%; /* Adjust width for smaller screens */
//     max-width: none; /* Remove maximum width */
//     margin-inline: 10px; /* Add inline margin */
//   }

//   .login-btn {
//     width: 90%; /* Adjust width for smaller screens */
//     margin-inline: 10px; /* Add inline margin */
//   }
// }
